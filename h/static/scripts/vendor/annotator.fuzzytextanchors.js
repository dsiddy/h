// Generated by CoffeeScript 1.6.3
/*
** Annotator 1.2.6-dev-ce90a27
** https://github.com/okfn/annotator/
**
** Copyright 2012 Aron Carroll, Rufus Pollock, and Nick Stenning.
** Dual licensed under the MIT and GPLv3 licenses.
** https://github.com/okfn/annotator/blob/master/LICENSE
**
** Built at: 2014-09-25 22:17:09Z
*/



/*
//
*/

// Generated by CoffeeScript 1.6.3
(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Annotator.Plugin.FuzzyTextAnchors = (function(_super) {
    __extends(FuzzyTextAnchors, _super);

    function FuzzyTextAnchors() {
      this.fuzzyMatching = __bind(this.fuzzyMatching, this);
      this.twoPhaseFuzzyMatching = __bind(this.twoPhaseFuzzyMatching, this);
      _ref = FuzzyTextAnchors.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    FuzzyTextAnchors.prototype.pluginInit = function() {
      var _this = this;
      if (!this.annotator.plugins.TextAnchors) {
        console.warn("The FuzzyTextAnchors Annotator plugin requires the TextAnchors plugin. Skipping.");
        return;
      }
      this.Annotator = Annotator;
      this.textFinder = new DomTextMatcher(function() {
        return _this.annotator.domMapper.getCorpus();
      });
      this.annotator.anchoringStrategies.push({
        name: "two-phase fuzzy",
        code: this.twoPhaseFuzzyMatching
      });
      return this.annotator.anchoringStrategies.push({
        name: "one-phase fuzzy",
        code: this.fuzzyMatching
      });
    };

    FuzzyTextAnchors.prototype.twoPhaseFuzzyMatching = function(annotation, target) {
      var expectedEnd, expectedStart, match, options, posSelector, prefix, quote, quoteSelector, result, suffix;
      if (this.annotator.domMapper.getInfoForNode == null) {
        return;
      }
      quoteSelector = this.annotator.findSelector(target.selector, "TextQuoteSelector");
      prefix = quoteSelector != null ? quoteSelector.prefix : void 0;
      suffix = quoteSelector != null ? quoteSelector.suffix : void 0;
      quote = quoteSelector != null ? quoteSelector.exact : void 0;
      if (!((prefix != null) && (suffix != null))) {
        return null;
      }
      posSelector = this.annotator.findSelector(target.selector, "TextPositionSelector");
      expectedStart = posSelector != null ? posSelector.start : void 0;
      expectedEnd = posSelector != null ? posSelector.end : void 0;
      options = {
        contextMatchDistance: this.annotator.domMapper.getCorpus().length * 2,
        contextMatchThreshold: 0.5,
        patternMatchThreshold: 0.5,
        flexContext: true
      };
      result = this.textFinder.searchFuzzyWithContext(prefix, suffix, quote, expectedStart, expectedEnd, false, options);
      if (!result.matches.length) {
        return null;
      }
      match = result.matches[0];
      return new this.Annotator.TextPositionAnchor(this.annotator, annotation, target, match.start, match.end, this.annotator.domMapper.getPageIndexForPos(match.start), this.annotator.domMapper.getPageIndexForPos(match.end), match.found, !match.exact ? match.comparison.diffHTML : void 0, !match.exact ? match.exactExceptCase : void 0);
    };

    FuzzyTextAnchors.prototype.fuzzyMatching = function(annotation, target) {
      var expectedStart, len, match, options, posSelector, quote, quoteSelector, result;
      if (this.annotator.domMapper.getInfoForNode == null) {
        return;
      }
      quoteSelector = this.annotator.findSelector(target.selector, "TextQuoteSelector");
      quote = quoteSelector != null ? quoteSelector.exact : void 0;
      if (quote == null) {
        return null;
      }
      if (!(quote.length >= 32)) {
        return;
      }
      posSelector = this.annotator.findSelector(target.selector, "TextPositionSelector");
      expectedStart = posSelector != null ? posSelector.start : void 0;
      len = this.annotator.domMapper.getCorpus().length;
      if (expectedStart == null) {
        expectedStart = Math.floor(len / 2);
      }
      options = {
        matchDistance: len * 2,
        withFuzzyComparison: true
      };
      result = this.textFinder.searchFuzzy(quote, expectedStart, false, options);
      if (!result.matches.length) {
        return null;
      }
      match = result.matches[0];
      return new this.Annotator.TextPositionAnchor(this.annotator, annotation, target, match.start, match.end, this.annotator.domMapper.getPageIndexForPos(match.start), this.annotator.domMapper.getPageIndexForPos(match.end), match.found, !match.exact ? match.comparison.diffHTML : void 0, !match.exact ? match.exactExceptCase : void 0);
    };

    return FuzzyTextAnchors;

  })(Annotator.Plugin);

}).call(this);
