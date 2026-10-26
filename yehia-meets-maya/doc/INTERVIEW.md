## I used in this project i used post of https://jsonplaceholder.typicode.com/posts

## • where each request runs, and how you verified it

The three requests are:
Profile=> server side
Preview=> server side
Load Post=> browser
Evidence is :
show in terminal npm run dev then the result is appear in browser.

## • why the profile is fetched on the server and the posts on the client

It is 2 issue one is server side and other is client (browser side).
The Client side it is the button that the user clicked. it calls the click event useState and send request to server.
The server side fetch for the request immediately without no user action.

## • what triggers the Suspense fallback

The fallback is appears when a component in the Suspense boundary is still waiting (an async Server Component awaiting its data).

A click button fetch runs in an event handler, outside the React rendering, so React doesn't know it is waiting. That is why need our own loading/errors state.

## • what changes if the boundary wraps the whole dashboard

If the boundary is warp the dashboard the fallback replace the whole of dashboard until everything inside has finished.

## • what the custom error class and super(message) do

Error class store HTTP status and a message, so catch block can recognize it and show the right message.

super(message) calls the parent Error constructor, so the message is set properly.

## • the difference between an HTTP failure, a network failure and an empty result

HTTP failure: the server did not answer, with status (404,500,503). fetch is resolve this problem you check response.ok.

network failure: not response at all because it is offline, DNS problem.

empty result: the request is success status (200) but return empty of array. It solve this if array is empty show the user message "No post found" not an error message.

## • what happens if you change ID 1 to 2

This means show for user ID 1 full data information to user ID 2 full data information.

## • which decision you personally verified

I usually test it first and try and catch it the error.
