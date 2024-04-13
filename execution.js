<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Text Input</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f4f4f4;
      }

      .container {
        width: 300px;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      h2 {
        margin-top: 0;
        margin-bottom: 20px;
        color: #333;
      }

      input[type="text"] {
        width: calc(100% - 10px);
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 16px;
      }

      button {
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
      }

      button:hover {
        background-color: #0056b3;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Enter Text:</h2>
      <input type="text" id="textInput" />
      <button onclick="getText()">Submit</button>
    </div>

    <script>
      function getText() {
        const inputText = document.getElementById("textInput").value;

        console.log("Entered text:", inputText);
        class Node {
          constructor(data, degree, words, loclist) {
            this.data = data;
            this.degree = degree;
            this.words = words;
            this.loclist = loclist;
            this.child = null;
            this.sibling = null;
            this.parent = null;
          }
        }

        function newNode(key, words, loclist) {
          let temp = new Node();
          temp.data = key;
          temp.degree = 0;
          temp.child = null;
          temp.parent = null;
          temp.sibling = null;
          temp.words = words;
          temp.loclist = loclist;
          return temp;
        }

        function mergeBinomialTrees(b1, b2) {
          if (
            b1.data > b2.data ||
            (b1.data === b2.data && b1.loclist[0] > b2.loclist[0])
          ) {
            let temp = b1;
            b1 = b2;
            b2 = temp;
          }
          b2.parent = b1;
          b2.sibling = b1.child;
          b1.child = b2;
          b1.degree++;
          return b1;
        }

        function unionBinomialHeap(l1, l2) {
          let _new = [];
          let it = 0;
          let ot = 0;

          while (it < l1.length && ot < l2.length) {
            if (l1[it].degree <= l2[ot].degree) {
              _new.push(l1[it]);
              it++;
            } else {
              _new.push(l2[ot]);
              ot++;
            }
          }

          while (it < l1.length) {
            _new.push(l1[it]);
            it++;
          }

          while (ot < l2.length) {
            _new.push(l2[ot]);
            ot++;
          }
          return _new;
        }

        function adjust(_heap) {
          if (_heap.length <= 1) return _heap;
          let new_heap = [];
          let it1 = 0,
            it2 = 0,
            it3 = 0;

          if (_heap.length === 2) {
            it2 = it1 + 1;
            it3 = _heap.length;
          } else {
            it2 = it1 + 1;
            it3 = it2 + 1;
          }

          while (it1 < _heap.length) {
            if (it2 === _heap.length) it1++;
            else if (_heap[it1].degree < _heap[it2].degree) {
              it1++;
              it2++;
              if (it3 !== _heap.length) it3++;
            } else if (
              it3 !== _heap.length &&
              _heap[it1].degree === _heap[it2].degree &&
              _heap[it1].degree === _heap[it3].degree
            ) {
              it1++;
              it2++;
              it3++;
            } else if (_heap[it1].degree === _heap[it2].degree) {
              _heap[it1] = mergeBinomialTrees(_heap[it1], _heap[it2]);
              _heap.splice(it2, 1);
              if (it3 !== _heap.length) it3++;
            }
          }
          return _heap;
        }

        function insertATreeInHeap(_heap, tree) {
          let temp = [];
          temp.push(tree);
          temp = unionBinomialHeap(_heap, temp);
          return adjust(temp);
        }

        function removeMinFromTreeReturnBHeap(tree) {
          let heap = [];
          let temp = tree.child;
          let lo;

          while (temp) {
            lo = temp;
            temp = temp.sibling;
            lo.sibling = null;
            lo.parent = null;
            heap.unshift(lo);
          }
          if (tree.child) tree.child.parent = null;
          tree.child = null;
          tree.degree = 0;
          return heap;
        }

        function insert(_head, temp) {
          return insertATreeInHeap(_head, temp);
        }

        function getMin(_heap) {
          let temp = _heap[0];
          for (let i = 1; i < _heap.length; i++) {
            if (
              _heap[i].data < temp.data ||
              (_heap[i].data === temp.data &&
                _heap[i].loclist[0] < temp.loclist[0])
            ) {
              temp = _heap[i];
            }
          }
          return temp;
        }

        function extractMin(_heap) {
          let new_heap = [];
          let lo;
          let temp;

          temp = getMin(_heap);

          for (let i = 0; i < _heap.length; i++) {
            if (_heap[i] !== temp) {
              new_heap.push(_heap[i]);
            }
          }
          lo = removeMinFromTreeReturnBHeap(temp);
          new_heap = unionBinomialHeap(new_heap, lo);
          new_heap = adjust(new_heap);
          return new_heap;
        }
        function printNode(node) {
          //console.log("(", node.words.length, ")");
          console.log(node.words);
          //console.log("freq = ", node.data, " loc_list = ");
          //console.log(node.loclist);
          // console.log("\n");
        }

        function printTree(h) {
          while (h) {
            printNode(h);
            printTree(h.child);
            h = h.sibling;
          }
        }
        function printHeap(_heap) {
          let tree = 0;
          let itcount = 0;
          for (let i = 0; i < _heap.length; i++) {
            // console.log(
            //   "------------------------------------------------------Tree " +
            //   ++tree +
            //   "-------------------------------------------------------"
            //  );
            printTree(_heap[i]);
            // console.log("hello");
          }
        }

        function main(paraId) {
          let times = 0;
          let binHeap = [];
          let keywordlist = [];
          let n = 69,
            m = 41;
          let threshold = 1,
            minsupport = 2;
          let positions = new Map();
          let position = 0;
          fetch(paraId + ".json")
            .then((response) => {
              if (!response.ok) {
                throw new Error(
                  `Network response for paraId ${paraId} was not ok`
                );
              }
              return response.json();
            })
            .then((data) => {
              data.forEach((wordObj) => {
                const word = wordObj.word;

                if (!positions.has(word)) {
                  positions.set(word, []);
                }
                positions.get(word).push(position);
                //console.log("printing it \n");
                //   console.log(position, word, positions.get(word));
                position++;
              });

              // console.log("Words loaded from AAA.json:", positions);

              positions.forEach((value, key) => {
                //   console.log("wkdowjdo");
                // console.log(key);
                //  console.log(value);
              });
              // console.log("how long is positions?\n");
              // console.log(positions.length);
              // Populate binHeap based on minsupport
              positions.forEach((loclist, word) => {
                //   console.log(loclist, word);
                if (loclist.length >= minsupport) {
                  let node = newNode(loclist.length, [word], loclist);
                  //  console.log("The node is \n");
                  //  console.log(node);
                  binHeap = insert(binHeap, node);
                  //  console.log(node.words);
                  //   console.log("h");
                }
              });
              //   console.log(binHeap.length);
              // Main loop to process the binHeap
              while (
                binHeap.length > 1 ||
                (binHeap.length === 1 && binHeap[0].degree > 0)
              ) {
                let minnode1, minnode2;
                minnode1 = getMin(binHeap);
                binHeap = extractMin(binHeap);
                minnode2 = getMin(binHeap);
                binHeap = extractMin(binHeap);

                let curloc1 = minnode1.loclist[0];
                let curloc2 = minnode2.loclist[0];
                let newwords = [...minnode1.words, ...minnode2.words];
                let newnode = newNode(0, newwords, []);
                let q1 = minnode1.loclist.slice();
                let q2 = minnode2.loclist.slice();

                while (curloc1 < curloc2) {
                  if (curloc2 === curloc1 + 1) {
                    newnode.loclist.push(curloc2);
                    newnode.data++;

                    minnode1.data--;
                    minnode1.loclist.shift();
                    curloc1 = minnode1.loclist[0];

                    minnode2.data--;
                    minnode2.loclist.shift();
                    curloc2 = minnode2.loclist[0];
                  } else break;
                }

                if (minnode1.data === 0 && minnode2.data === 0) {
                  if (newnode) {
                    binHeap = insert(binHeap, newnode);
                  }
                } else {
                  if (minnode1.words.length > 1) {
                    //  console.log("inserting into keywordlist\n");
                    keywordlist = insert(keywordlist, minnode1);
                    printHeap(keywordlist);
                  }
                  if (minnode2.words.length > 1) {
                    //    console.log("inserting into keywordlist\n");
                    keywordlist = insert(keywordlist, minnode2);
                    printHeap(keywordlist);
                  } else if (minnode2.data !== 0) {
                    minnode2.loclist = q2;
                    minnode2.data = minnode2.loclist.length;
                    binHeap = insert(binHeap, minnode2);
                  }
                }
              }

              // Process remaining elements in binHeap if any
              if (binHeap.length) {
                let minnode = getMin(binHeap);
                binHeap = extractMin(binHeap);
                if (minnode.words.length > 1) {
                  keywordlist = insert(keywordlist, minnode);
                }
              }

              // Print keywords
              //    console.log(
              ("------------------KEYWORDS-------------------------\n");
              //);
              //  console.log(keywordlist.length);
              printHeap(keywordlist);
            })
            .catch((error) => {
              console.error("Error fetching or parsing JSON:", error);
            });

          return 0;
        }

        main();
        function decrChar(ch) {
          switch (ch) {
            case "A":
              return [true, "9"];
            case "a":
              return [true, "9"];
            case "0":
              return [true, "Z"];
            default:
              return [false, String.fromCharCode(ch.charCodeAt(0) - 1)];
          }
        }

        function predecessor(input) {
          let X = input.charAt(0);
          let Y = input.charAt(1);
          let Z = input.charAt(2);
          let flag = false;
          [flag, Z] = decrChar(Z);
          if (flag == false) return X + Y + Z;
          [flag, Y] = decrChar(Y);
          if (flag == false) return X + Y + Z;
          [flag, X] = decrChar(X);
          return X + Y + Z;
        }

        async function iterateFiles() {
          let paraId = "AAF";
          const stopId = "999";

          while (paraId !== stopId) {
            await main(paraId);

            paraId = predecessor(paraId);
          }
        }

        iterateFiles();
      }
    </script>
  </body>
</html>
