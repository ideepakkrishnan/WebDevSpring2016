/**
 * Created by ideepakkrishnan on 25-03-2016.
 */

(function () {
    "use strict";

    angular
        .module("PerformXApp")
        .factory("GoalService", goalService);

    function goalService($http) {
        var api = {
            findAllGoals: findAllGoals,
            findAllGoalsForUsername: findAllGoalsForUsername,
            findAllGoalsAssignedByUsername: findAllGoalsAssignedByUsername,
            findAllGoalsAssignedToUserByWatcher: findAllGoalsAssignedToUserByWatcher,
            createGoal: createGoal,
            deleteGoalById: deleteGoalById,
            updateGoal: updateGoal
        };
        return api;

        function findAllGoals() {
            return $http.get("/api/project/user/goal");
        }

        function findAllGoalsForUsername(username) {
            return $http.get("/api/project/user/" + username + "/goal");
        }

        function findAllGoalsAssignedByUsername(username) {
            return $http.get("/api/project/user/" + username + "/goal/watch");
        }

        function findAllGoalsAssignedToUserByWatcher(assignedTo, assignedBy) {
            return $http.get("/api/project/user/" + assignedTo + "/goal/watcher/" + assignedBy);
        }

        function createGoal(goal) {
            return $http.post("/api/project/user/goal", goal);
        }

        function deleteGoalById(goalId) {
            return $http.delete("/api/project/user/goal/" + goalId);
        }

        function updateGoal(goalId, goal) {
            return $http.put("/api/project/user/goal/" + goalId, goal);
        }
    }
})();