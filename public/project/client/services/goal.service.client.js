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
            createGoal: createGoal,
            deleteGoalById: deleteGoalById,
            updateGoal: updateGoal
        };
        return api;

        function findAllGoals() {
            return $http.get("/api/project/user/goal")
                .then(
                    function (response) {
                        return response;
                    },
                    function (error) {
                        throw error;
                    });
        }

        function createGoal(goal) {
            return $http.post("/api/project/user/goal", goal)
                .then(
                    function (response) {
                        return response;
                    },
                    function (error) {
                        throw error;
                    });
        }

        function deleteGoalById(goalId) {
            return $http.delete("/api/project/user/goal/" + goalId)
                .then(
                    function (response) {
                        return response;
                    },
                    function (error) {
                        throw error;
                    });
        }

        function updateGoal(goalId, goal) {
            return $http.put("/api/project/user/goal/" + goalId, goal)
                .then(
                    function (response) {
                        return response;
                    },
                    function (error) {
                        throw error;
                    });
        }
    }
})();