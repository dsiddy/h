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

  Annotator.Plugin.TextQuote = (function(_super) {
    __extends(TextQuote, _super);

    function TextQuote() {
      this._getTextQuoteSelector = __bind(this._getTextQuoteSelector, this);
      _ref = TextQuote.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TextQuote.Annotator = Annotator;

    TextQuote.$ = Annotator.$;

    TextQuote.prototype.pluginInit = function() {
      var _this = this;
      this.annotator.selectorCreators.push({
        name: "TextQuoteSelector",
        describe: this._getTextQuoteSelector
      });
      return this.annotator.getQuoteForTarget = function(target) {
        var selector;
        selector = _this.annotator.findSelector(target.selector, "TextQuoteSelector");
        if (selector != null) {
          return _this.annotator.normalizeString(selector.exact);
        } else {
          return null;
        }
      };
    };

    TextQuote.prototype._getTextQuoteSelector = function(selection) {
      var endOffset, prefix, quote, rangeEnd, rangeStart, startOffset, suffix, _ref1;
      if (selection.type !== "text range") {
        return [];
      }
      if (selection.range == null) {
        throw new Error("Called getTextQuoteSelector() with null range!");
      }
      rangeStart = selection.range.start;
      if (rangeStart == null) {
        throw new Error("Called getTextQuoteSelector() on a range with no valid start.");
      }
      rangeEnd = selection.range.end;
      if (rangeEnd == null) {
        throw new Error("Called getTextQuoteSelector() on a range with no valid end.");
      }
      if (this.annotator.domMapper.getStartPosForNode != null) {
        startOffset = this.annotator.domMapper.getStartPosForNode(rangeStart);
        endOffset = this.annotator.domMapper.getEndPosForNode(rangeEnd);
        if ((startOffset != null) && (endOffset != null)) {
          quote = this.annotator.domMapper.getCorpus().slice(startOffset, +(endOffset - 1) + 1 || 9e9).trim();
          _ref1 = this.annotator.domMapper.getContextForCharRange(startOffset, endOffset), prefix = _ref1[0], suffix = _ref1[1];
          return [
            {
              type: "TextQuoteSelector",
              exact: quote,
              prefix: prefix,
              suffix: suffix
            }
          ];
        } else {
          console.log("Warning: can't generate TextQuote selector.", startOffset, endOffset);
          return [];
        }
      } else {
        return [
          {
            type: "TextQuoteSelector",
            exact: selection.range.text().trim()
          }
        ];
      }
    };

    return TextQuote;

  })(Annotator.Plugin);

}).call(this);
