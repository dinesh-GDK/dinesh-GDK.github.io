---
layout: post
title:  "Deep Maze Solver"
date:   2024-04-07 00:00:00 -0700
categories: deep learning
---

A few days ago saw a [Twitter Post] explaining that diffusion models could be used to solve algorithmic tasks like solving mazes. Intrigued by this post, I was curious to replicate this work at least on a smaller scale. So I began my journey to build a neural network that can solve mazes.

### Problem
The aim is to build a convolutional neural network(CNN) that can solve mazes using supervised learning. Given a maze image, the CNN has to find the path from the top left corner of the maze to the bottom right corner. We are using PyTorch for this task.

### Dataset
Since creating and solving mazes is deterministic, we have an infinite dataset glitch. We are going to create mazes and solutions on the fly! Yes, we have infinite datasets and we do not want to label them manually, this sounds like a dream!

To create a maze I'm using the **Recursive Division** algorithm, and to solve it, I'm using good old **Depth-first Search**. Maze generation and maze solvers require posts on their own, feel free to go down this rabbit hole. Due to the resource constraints on my end(cough... GPU... cough) the dataset will only contain mazes of sizes from `5x5` to `127x127`. Here `nxn` means the number of blocks horizontally and vertically. We will resize the mazes to create an image of size `128x128`(we can use any size but we need to wage a war with padding the outputs from the different layers of the network) using nearest neighbor interpolation. The goal is to connect the top left corner of the maze to the bottom right corner of the maze. There is only one path that connects any two points in our maze.

Here is a sample `57x57` maze and its solution.

![sample_maze_and_solution]({{site.url}}/_img/deep-maze-solver/sample_maze_and_solution.png)


### Pre-processing
The input will be the maze and the labels will be the solved maze. We can simplify the format of the dataset so the network can learn and predict just the solution and not worry about rendering the borders and other structures.

Here is the same maze with the solution showing only the path.

![sample_maze_and_path]({{site.url}}/_img/deep-maze-solver/sample_maze_and_path.png)

Finally, we resize them to `128x128` to get the final input and labels

![sample_dataset]({{site.url}}/_img/deep-maze-solver/sample_dataset.png)

The image gets a little bit distorted due to resizing, but still, it does not modify the structure of the maze so this shouldn't be a problem.

### The Model
We are going to use regular **U-Net** to solve this problem. Nothing fancy. 

### Training
Here are the hyper-parameters
- Batch Size - 16
- Optimizer - Adam
- Loss - Binary Cross Entropy
- Learning rate - 10<sup>-4</sup>
- Train dataset - 500,000
- Validation dataset - 100,000

When we train the model using the entire train dataset, we call it one epoch. Since we randomly generate mazes epochs don't mean anything here. 

### Result
Here is the training loss computed for every 1,000 samples. The validation loss was calculated using 200 samples after training on 1,000 samples.

![loss]({{site.url}}/_img/deep-maze-solver/loss.png)

Here are a few results from the model

![output_15]({{site.url}}/_img/deep-maze-solver/output_15.png)

![output_57]({{site.url}}/_img/deep-maze-solver/output_57.png)

![output_127]({{site.url}}/_img/deep-maze-solver/output_127.png)

The model performs well for the mazes of small and medium sizes, it struggles a bit to solve a big maze. But I think this can be solved using the same modern techniques companies predominantly use right now(Big model, Big data, Big time training, Big hardware, Big Money)

### Conclusion
Well, it has been very interesting working on this project. We know neural networks are being used to solve way more complex problems, but it is fascinating to look at them to solve algorithmic problems like these.

Here is the link to the [Github repo] if you are curious to know behind the scenes.

Also shoutout to this wonderful repo for providing the [U-Net code].

[Twitter Post]: https://twitter.com/ArnaudPannatier/status/1762864347397628396
[Github repo]: https://github.com/dinesh-GDK/deep-maze-solver
[U-Net code]: https://github.com/LeeJunHyun/Image_Segmentation
