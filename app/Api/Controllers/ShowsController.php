<?php

namespace App\Api\Controllers;

use App\Api\Requests\ShowRequest;
use App\Api\Transformers\ShowTransformer;
use App\Show;

class ShowsController extends BaseController
{

    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    public function index()
    {
        $shows = Show::all();
        return $this->collection(Show::all(), new ShowTransformer);
    }

    public function show($id)
    {
        return $this->item(Show::findOrFail($id), new ShowTransformer);
    }

    public function store(ShowRequest $request)
    {
        return Show::create($request->only(['name']));
    }

    public function update(ShowRequest $request, $id)
    {
        $show = Show::findOrFail($id);
        $show->update($request->only(['name']));
        return $show;
    }

    public function destroy($id)
    {
        return Show::destroy($id);
    }
}