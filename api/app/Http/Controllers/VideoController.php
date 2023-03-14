<?php

namespace App\Http\Controllers;

use App\Http\Resources\VideoResource;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;

class VideoController extends Controller
{
	public function getVideo (Video $video): VideoResource
	{
		return VideoResource::make($video);
	}

	public function getAllVideos (): AnonymousResourceCollection
	{
		return VideoResource::collection(Video::all());
	}

	public function saveVideo (Request $req): VideoResource
	{
		$req->validate([
			'title' => 'nullable|string|max:50',
			'desc' => 'nullable|string|max:255',
			'video' => [
				'required',
				// Size in kilobytes
				(new File())->max(50 * 1024),
			],
		]);
		$path = Storage::putFile('storage', $req->file('video'));
		return VideoResource::make(Video::create([
			'title' => $req->input('title'),
			'desc' => $req->input('desc'),
			'path' => $path,
		]));
	}
}
