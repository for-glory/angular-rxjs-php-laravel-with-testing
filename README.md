# applicant-project

Thanks for applying to GoReact! To help us learn more about you and give you an opportunity to show us your stuff, we'd like you to build a simple web application.  We will go over the requirements for what this web application needs to do, but you are free to write it using any tools/technologies/frameworks/languages/whatever you want.  We don't care.  We want to see how you think, solve problems and build solutions.

## The Project
We do a lot with media and files at GoReact, so we'd like you to build a simple file manager app.  We only want to see a few things from this app:

* Allow uploading and persisting `.jpg` and `.mp4` files
* Show a UI where users can upload new files, and show the list of files uploaded so far
* Provide a way to "preview" the uploaded files.  For images, we want to see the image, and for mp4's, play the video
* Write basic tests for your code, and document a way to run them

GoReact is built using PHP 7.1 with Laravel as the web framework.  On the front-end we use webpack, TypeScript and angularjs.  Again, you are free to build your project with whatever you want.  Just make sure your README is clear and don't assume we have things installed on our computers.  We will be cloning your repo and running it on our machines.  If you are comfortable, using something like Docker or Vagrant is a good idea to make it easy for others to run your project.

Your project should include a `README` that explains how to run it, set it up and run any tests etc.

**MAKE SURE YOU TEST YOUR INSTRUCTIONS YOURSELF**.

You don't want us to tell you your instructions don't work.

## Extra Requirements
In addition to the above requirements, we want you to choose at *least* one more from the list below to include in your implementation:

* Generate code coverage for your tests, and document how coverage stats can be generated
* Add a login mechanism, and allow each user to have their own list of files
* Add a way to associate a title, description and tags with a file and have those changes persist.  Allow for filtering the list of files with search terms that can match these new fields
* Use S3 or some other cloud-based storage for the files
* In addition to `mp4` and `jpg`, support `pdf` files, including the ability to render and preview them
* Use a responsive layout that works and looks great on desktops and mobile devices
* Add player controls when previewing `mp4` files.  Include controls that allow for:
   * Skipping forward and back 10 seconds
   * Pause/Play
   * Speed up/slow down playback
* Have a cool idea not on this list? Go ahead and do it but let us know what you decided to do!

## Submission
Please create a project in GitHub or your online repository of choice and share it with us.

## Timeline
We expect you to take somewhere between 2-4 hours to complete this and would love to see your project within a week of us sending this request to you.  If you need more time because you want to go above and beyond, or if you are just needing more time for any reason, just reach out and let us know.