# phyta-cli

[![NPM](https://nodei.co/npm/phyta-cli.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/phyta-cli/)

Command line interface, that allows the user to process
trees with the metrics and parsers available.

**Install:**

In order to use the phyta-cli you need to install it globally in your machine using: 
>npm install -g phyta-cli

**Options:**
* **`-h, --help `**
Shows the usage information.

* **`-V, --version`**
Shows the CLI version number.

* **`-l, --path <path>`** 
Path to folder with files to be processed.

* **`-f, --trees <path>`** 
Path to file with trees to be processed.

* **`-t, --types <path>`**
Path to file with tree types.

* **`-m, --metrics <path>`**
Path to file with metrics.

* **`-p,  --parser <parser>`**
Parser to be used on the trees.

* **`-o,  --output <path>`**
Output path where the results will be saved.

All command options are required, if any one of them is missing an exception will be thrown.

**Usage example:**

In order to run PhytA-cli from command line, you must specify,the metrics that will be used, the trees and their types. Each one in a different file. 
All the metrics, trees and tree types are separated by `$` character.

**Tree file:**

>trees.txt 

>(A,B,(C,D)E)F;$(A,B,(C,D)E)F;

**Tree types file:**

>types.txt

>rooted$rooted

**Metrics file:**

>metrics.txt

>robinsonFoulds$robinsonFouldsLength

Using the files specified above, we can run CLI using this command:

> phyta-cli --path /Users/rafae/Desktop/Trees/ --trees trees.txt --types types.txt --metrics metrics.txt --parser newick --output results

**Results:**

Now we give more details about the trees inserted
 and we mark the similarities and dissimilarities between phylogenetic trees given by
 the json field diffsT1 and diffsT2.
 
**Supported metrics and parsers:**

Now we support four metrics!! Each are: Robinson–Foulds, Robinson–Foulds Length, triplet and quartet metric.

More parsers may be added in the future but for now only newick parser is supported.

**Web-application:**

If you desire to see the tree visualization and not only the result values,
we have [web application](http://cloud131.ncg.ingrid.pt:3000/home) temporally hosted.
Feel free to test it out and if possible give us some opinions and critics.