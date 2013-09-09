define([
    'argumenta/widgets/Argument',
    'argumenta/widgets/Proposition',
    '../../test/fixtures/headers'
], function(Argument, Proposition, Headers) {

    var Fixtures = {};

    // Arguments

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
        ],
        repo: "the-argument-title"
    }; };

    Fixtures.validArgument = function() {
        var data    = Fixtures.validArgumentData();
        data.commit = Fixtures.validCommitData();
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

    // Propositions

    Fixtures.validPropositionData = function() { return {
        object_type: 'proposition',
        sha1: '71a7ccf87a4ba1fbb3b3199fdf5a56c6ee209178',
        text: 'The proposition text.'
    }; };

    Fixtures.validProposition = function() {
        var data = Fixtures.validPropositionData();
        return new Proposition(data);
    };

    Fixtures.validProposition = function() {
        var data = Fixtures.validPropositionData();
        return new Proposition(data);
    };

    Fixtures.validPropositionMetadata = function() { return {
        sha1: '71a7ccf87a4ba1fbb3b3199fdf5a56c6ee209178',
        object_type: 'proposition',
        tag_sha1s: {
            support: ['0123456789abcdef000000000000000000000000'],
            dispute: [],
            citation: []
        },
        tag_counts: {
            support: 1,
            dispute: 0,
            citation: 0
        }
    }; };

    // Add Tag

    Fixtures.tagDataFor = function( type, target, source ) {
        type = type || 'support';
        target = target || {};
        source = source || {};
        var data = {
            object_type: 'tag',
            tag_type: type,
            target_type: target.object_type,
            target_sha1: target.sha1,
            source_type: source.object_type,
            source_sha1: source.sha1,
            citation_text: source.citation_text
        }
        return data;
    };

    Fixtures.validAddTagData = function() {
        var target = Fixtures.validPropositionData();
        var source = Fixtures.validArgumentData();
        source.citation_text = Fixtures.validCitationText();
        var data = Fixtures.tagDataFor('support', target, source);
        return data;
    };

    // Tags

    Fixtures.validTagsData = function() {
        var target = Fixtures.validPropositionData();
        var data = {
            target_sha1: target.sha1,
            target_type: target.object_type
        };
        return data;
    };

    Fixtures.tagsPlusSourcesData = function() {
        var target = Fixtures.validPropositionData();
        var source = Fixtures.validArgumentData();
        var tag = Fixtures.tagDataFor('support', target, source)
        var data = {
            tags: [ tag ],
            sources: [ source ]
        };
        return data;
    };

    // Citation

    Fixtures.validCitationText = function() {
        return 'The citation text, ' +
               'with URL: http://wikipedia.org/wiki/Citation';
    };

    Fixtures.citationTextWithMedia = function() {
        return 'The citation text, ' +
               'with media URL: http://youtu.be/5i1lbhc0c_s'
    };

    Fixtures.validCitationData = function() {
        var type = 'citation';
        var target = Fixtures.validPropositionData();
        var source = {
            citation_text: Fixtures.validCitationText()
        }
        return Fixtures.tagDataFor(type, target, source);
    };

    // Users

    Fixtures.validJoinDate = function() {
        return new Date();
    };

    Fixtures.validGravatarID = function() {
        return '47d76f2756b5239dd9973596519bdcb6';
    }

    Fixtures.validUsername = function() {
        return 'tester';
    }

    Fixtures.validPublicUserData = function() { return {
        username    : Fixtures.validUsername(),
        join_date   : Fixtures.validJoinDate().toISOString(),
        gravatar_id : Fixtures.validGravatarID(),
        metadata    : Fixtures.validUserMetadata()
    }; };

    Fixtures.validUserMetadata = function() { return {
        repos_count : 0
    }; };

    // Repos

    Fixtures.validRepoData = function() { return {
        username:   'tester',
        reponame:   'the-argument-title',
        user:       Fixtures.validPublicUserData(),
        commit:     Fixtures.validCommitData(),
        target:     Fixtures.validArgumentData()
    }; };

    // Headers

    Fixtures.headers = Headers;

    return Fixtures;
});
