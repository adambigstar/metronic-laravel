<!-- BEGIN PAGE HEADER-->
<div class="page-bar">
  <ul class="page-breadcrumb">
    <li>
      <a href="#/dashboard.html">Home</a>
      <i class="fa fa-circle"></i>
    </li>
    <li>
      <a href="#">Dashboard</a>
    </li>
  </ul>
  <div class="page-toolbar">
    <div class="btn-group pull-right">
      <button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" dropdown-menu-hover data-delay="1000" data-close-others="true"> Actions
        <i class="fa fa-angle-down"></i>
      </button>
      <ul class="dropdown-menu pull-right" role="menu">
        <li>
          <a href="#">
            <i class="icon-user"></i> New User </a>
        </li>
        <li>
          <a href="#">
            <i class="icon-present"></i> New Event
            <span class="badge badge-success">4</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="icon-basket"></i> New order </a>
        </li>
        <li class="divider"> </li>
        <li>
          <a href="#">
            <i class="icon-flag"></i> Pending Orders
            <span class="badge badge-danger">4</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="icon-users"></i> Pending Users
            <span class="badge badge-warning">12</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>
<h3 class="page-title"> Dashboard </h3>
<!-- END PAGE HEADER-->
<!-- BEGIN MAIN CONTENT -->
<div ng-controller="DashboardController">

</div>
<!-- END MAIN CONTENT -->
<!-- BEGIN MAIN JS & CSS -->
<script>
  Dashboard.init();
</script>
<!-- BEGIN MAIN JS & CSS -->