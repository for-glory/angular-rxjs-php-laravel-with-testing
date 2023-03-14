<?php

namespace Tests\Feature;

use App\Models\Video;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Mockery;
use Tests\TestCase;

class VideoControllerTest extends TestCase
{
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */
	public function test_get_videos_with_empty_db ()
	{
		$response = $this->get('/api/videos');
		$response->assertStatus(200);
	}

	public function test_add_video ()
	{
		Storage::fake('public');
		$mp4 = UploadedFile::fake()->create('my-video.mp4', 1356, 'video/mp4');
		$response = $this->post('/api/videos', [
			'video' => $mp4
		]);

		/** @var Video $video */
		$video = $response->baseResponse->original;

		$response->assertStatus(201);
		$response->assertJsonStructure([
			'id', 'path'
		]);
		$this->assertNotNull($video);
		Storage::assertExists($video->path);
		Mockery::close();
	}

	public function test_add_video_greater_than_50mb()
	{
		Storage::fake('public');
		$mp4 = UploadedFile::fake()->create('my-video.mp4', 50 * 1024 + 1, 'video/mp4');

		$response = $this->post('/api/videos', [
			'video' => $mp4
		]);
		
		$response->assertSessionHasErrors(['video']);
		Mockery::close();
	}

	public function test_get_videos ()
	{
		Video::factory()->count(3)->create();
		$response = $this->get('/api/videos');
		$response
			->assertStatus(200)
			->assertJsonCount(3);
	}

	public function test_get_single_video ()
	{
		$video = Video::factory()->create();
		$response = $this->get("/api/videos/{$video->getKey()}");
		$response
			->assertStatus(200)
			->assertJsonStructure([
				'id', 'path'
			]);
	}

	public function test_modify_video ()
	{
		$video = Video::factory()->create();
		
		$response = $this->put("/api/videos/{$video->getKey()}", [
			'title' => 'title',
			'desc' => 'desc',
		]);

		/** @var Video $res */
		$res = $response->baseResponse->original;

		$response->assertStatus(200);
		$response->assertJsonStructure([
			'id', 'title', 'desc', 'path'
		]);

		$this->assertNotNull($res);
		$this->assertEquals($video->getKey(), $res->id);
		$this->assertEquals('title', $res->title);
		$this->assertEquals('desc', $res->desc);
	}
}
