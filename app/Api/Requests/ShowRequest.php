<?php

namespace App\Api\Requests;

use Dingo\Api\Http\FormRequest;

class ShowRequest extends FormRequest
{
	public function authorize()
	{
		return true;
	}

	public function rules()
	{
		return [
	    	'name' => 'required|max:200',
    	];
	}
}