(function() {
  'use strict';

  angular.module('app', [])
    .component('fluff', {
      controller: controller,
      template: `
      <h1>Classified</h1>
      <hr/>
      <form novalidate name="postform">
        <input type="text" name="title" ng-model="$ctrl.post.title" placeholder="Title"/>
        <input type="text" name="price" ng-model="$ctrl.post.price" placeholder="Price"/>
        <input type="text" name="description" ng-model="$ctrl.post.description" placeholder="Description"/>
        <input type="text" name="image url" ng-model="$ctrl.post.item_image" placeholder="image url"/>
        <button type="submit" class="btn btn-primary" ng-click="$ctrl.createPost()">Create Post</button>
      </form>
      <hr/>
      <form novalidate name="editform">
        <input type="text" name="postId" ng-model="$ctrl.update.id" placeholder="post id"/>
        <input type="text" name="title" ng-model="$ctrl.update.title" placeholder="Title"/>
        <input type="text" name="price" ng-model="$ctrl.update.price" placeholder="Price"/>
        <input type="text" name="description" ng-model="$ctrl.update.description" placeholder="Description"/>
        <input type="text" name="image url" ng-model="$ctrl.update.item_image" placeholder="image url"/>
        <button type="submit" class="btn btn-primary" ng-click="$ctrl.updatePost()">Update Post</button>
      </form>
      <hr/>
      <form novalidate name="delete">
        <input type="text" name="postId" ng-model="$ctrl.delete.id" placeholder="post id"/>
        <button type="submit" class="btn btn-primary" ng-click="$ctrl.deletePost()">Delete Post</button>
      </form>
      <hr/>
        <input type="text" name="filter" ng-model="$ctrl.filter" placeholder="filter"/>
        <button ng-click="$ctrl.order='price'">Order by price</button>
        <button ng-click="$ctrl.order='created_at'">Order by date</button>
      <hr/>
      <div ng-init="$ctrl.order = 'id'" ng-repeat="post in $ctrl.postData | filter: $ctrl.filter | orderBy: $ctrl.order">
        <p>id: {{post.id}}</p>
        <img src={{post.item_image}}/>
        <p>{{post.title}}</p>
        <p>$ {{post.price}}</p>
        <p>Description: {{post.description}}</p>
        <p>Post Date: {{post.created_at}}</p>
        <hr/>
      </div>
    `
    });

  controller.$inject = ['$http'];

  function controller($http) {
    const vm = this;

    vm.$onInit = function() {
      this.getAll();
    };

    vm.createPost = function() {
      $http.post(`https://eb-classified-api.herokuapp.com/classifieds`, vm.post)
        .then((res) => {
          vm.postData.push(res.data);
          delete vm.post;
        });
    };

    vm.updatePost = function() {
      var id = vm.update.id;
      delete vm.update.id;
      $http.patch(`https://eb-classified-api.herokuapp.com/classifieds/${id}`, vm.update)
        .then(() => {
          delete vm.update;
          vm.getAll();
        });
    };

    vm.deletePost = function() {
      var id = parseInt(vm.delete.id);
      $http.delete(`https://eb-classified-api.herokuapp.com/classifieds/${id}`)
        .then(() => {
          delete vm.delete;
          vm.getAll();
        });
    };

    vm.getAll = function() {
      $http.get(`https://eb-classified-api.herokuapp.com/classifieds`).then((res) => {
        console.log(res.data);
        vm.postData = res.data;
      });
    };
  }

}());
