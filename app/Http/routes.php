<?php

Route::auth();

Route::get('/', 'HomeController@index');
Route::get('/home', 'HomeController@index');

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', ['namespace' => 'App\Api\Controllers'], function ($api) {
	// Login route
	$api->post('login', 'AuthController@authenticate');
	$api->post('register', 'AuthController@register');
	// Shows! All routes in here are protected and thus need a valid token
	//$api->group( [ 'protected' => true, 'middleware' => 'jwt.refresh' ], function ($api) {
	$api->group( [ 'middleware' => 'jwt.auth' ], function ($api) {
		$api->get('users/me', 'AuthController@me');
		$api->get('validate_token', 'AuthController@validateToken');
		$api->resource('shows', 'ShowsController');
	});
});

Route::group(['middleware' => 'admin'], function ($admin) {
  $admin->get('admin', 'Admin\DashboardController@index');
  $admin->get('admin/dashboard', 'Admin\DashboardController@dashboard');
});
