//this soft-test measures changes in pos using reference text from wikipedia
//it prints-out a nice diff of changes in the current nlp.pos()
var texts = require("./texts")
var latest = require("./latest")
var nlp = require("../../index")

function compare_to_latest() {
  console.log("comparing results..")
  Object.keys(texts).forEach(function(k) {
    console.log("\n  == "+k+" ==\n")
    //make a nice array of results
    var results = nlp.pos(texts[k]).sentences.map(function(s) {
      return [s.tags(), s.tokens.map(function(t) {
        return t.text
      })]
    })
    latest[k].forEach(function(l, i) {
      //make sure their tokens line-up
      if (l.length != results[i][0].length) {
        console.log("    "+i+")   --tokenization change-- \"" + results[i][1].slice(0, 10).join(' ') + "\"..")
        return
      }
      l.forEach(function(pos, i2) {
        if (pos != results[i][0][i2]) {
          //we found a discrepency
          console.log("    "+i+")    " + results[i][0][i2] + " -> " + pos + '  - "' + results[i][1][i2] + '"')
        }
      })
    })
  })
  console.log("")
}

function print_new_results() {
  var all = {}
  Object.keys(texts).forEach(function(k) {
    var done = nlp.pos(texts[k]);
    var results = done.sentences.map(function(s) {
      return s.tags()
    })
    all[k] = results
  })
  console.log(JSON.stringify(all, null, 1))
}

compare_to_latest()
// print_new_results()
