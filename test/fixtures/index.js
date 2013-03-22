define([
    'argumenta/widgets/Argument'
], function(Argument) {

    var Fixtures = {};

    Fixtures.validArgumentData = function() { return {
        object_type: "argument",
        sha1: "7077e1ce31bc8e9d2a88479aa2d159f2f9de4856",
        title: "The Argument Title",
        premises: [
            "The first premise.",
            "The second premise."
        ],
        conclusion: "The conclusion.",
        propositions: [
            {
                text: "The first premise.",
                sha1: "d7574671f9327761109829761d97d7001b60cd43"
            },
            {
                text: "The second premise.",
                sha1: "503db2aa0a6d31e73f66c3efd8e15f92ee7d11be"
            },
            {
                text: "The conclusion.",
                sha1: "3940b2a6a3d5778297f0e37a06109f9d3dcffe6d"
            }
        ]
    }; };

    Fixtures.validArgument = function() {
        var data = Fixtures.validArgumentData();
        return new Argument(data);
    };

    Fixtures.validCommitData = function() { return {
        object_type: "commit",
        sha1: "57f61273647ef3bf4152ada12ea8b68f9cea2f36",
        target_type: 'argument',
        target_sha1: '39cb3925a38f954cf4ca12985f5f948177f6da5e',
        committer: 'tester',
        commit_date: '1970-01-01T00:00:00Z',
        parent_sha1s: [
            '0123456789abcdef000000000000000000000000',
            '1a1a1a1a1a1a1a1a000000000000000000000000'
        ]
    }; };

    return Fixtures;
});
