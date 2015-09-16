/*jslint browser: true*/
/*jslint node: true*/
/*global $, jQuery, alert*/
"use strict";

var addHighlight = function (elem) {
    elem.css("background", "#28E87D");
};

$.fn.customTyped = function (attr) {
    var element = this,
        settings = $.extend({
            strings: ["word1", "word2"],
            firstDelay: 1000,
            typingSpeed: 95,
            highlightSpeed: 25,
            delay: 1200
        }, attr),
        wordIndex = 0,

        typeChar = function (word, i) {
            setTimeout(function () {
                element.append('<span data-id="' + i + '">' + word.charAt(i) + '</span>');
            }, settings.typingSpeed * i);
        },

        typeWord = function (word) {
            element.html('');
            var i;
            for (i = 0; i < word.length; i += 1) {
                typeChar(word, i);
            }
            setTimeout(function () {
                highlightWord();
            }, settings.typingSpeed * word.length + (settings.delay / 2));
        },

        highlightChar = function (i) {
            setTimeout(function () {
                var char = element.find('span[data-id="' + i + '"]');
                addHighlight(char);
            }, settings.highlightSpeed * i);
        },

        highlightWord = function () {
            var word = settings.strings[wordIndex],
                i,
                index = word.length - 1;
            for (i = index; i >= 0; i -= 1) {
                highlightChar(i);
            }
            setTimeout(function () {
                wordIndex += 1;
                typeWords();
            }, settings.highlightSpeed * word.length + settings.delay);
        },

        typeWords = function () {
            if (wordIndex < settings.strings.length) {
                typeWord(settings.strings[wordIndex]);
            }
        };
    element.html('');
    var i;
    for (i = 0; i < settings.strings[wordIndex].length; i += 1) {
        element.append('<span data-id="' + i + '">' + settings.strings[wordIndex].charAt(i) + '</span>');
    }
    setTimeout(function () {
        highlightWord();
    }, settings.firstDelay);
};

$(document).ready(function () {
    /* $('.typed-words').typed({
        strings: ["PARTNERS", "DESIGNERS", "MARKETERS", "DEVELOPERS", "SEO", "HOSTS", "PARTNERS"],
        typeSpeed: 70,
        showCursor: false,
        backDelay: 700,
        backSpeed: 0
    }); */
    $('.typed-words').customTyped({strings: ["PARTNERS", "DESIGNERS", "MARKETERS", "DEVELOPERS", "SEO", "HOSTS", "PARTNERS"]});
    setTimeout(function () {
        $('.header-container').particleground({
            dotColor: "#45c0e6",
            lineColor: "#5e5e5e",
            parallax: false
        });
    }, 100);
});
