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

> phyta-cli --trees /Users/RafaelPereira/Desktop/trees/trees.txt --types /Users/RafaelPereira/Desktop/trees/types.txt --metrics /Users/Raf
  aelPereira/Desktop/trees/metrics.txt --parser newick --output /Users/RafaelPereira/Desktop


**Supported metrics and parsers:**

For now only Robinson–Foulds and Robinson–Foulds Length are available in the future more metrics will be added, for example: Triplet metric.

More parsers may be added in the future but for now only newick parser is supported.

