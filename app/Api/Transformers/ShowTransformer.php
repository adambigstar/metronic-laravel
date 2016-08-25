<?php

namespace App\Api\Transformers;

use App\Show;
use League\Fractal\TransformerAbstract;

class ShowTransformer extends TransformerAbstract
{
	public function transform(Show $show)
	{
		return [
			'id' 	=> (int) $show->id,
			'name'  => $show->name,
		];
	}
}