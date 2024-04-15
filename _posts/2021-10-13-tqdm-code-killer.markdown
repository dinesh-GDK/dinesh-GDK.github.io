---
layout: post
title:  "Is Progress bar (tqdm) killing your code?"
date:   2021-10-03 00:00:00 -0700
categories: deep learning
---

## Introduction
Everyone familiar with Python knows that the quick and effective way to implement a progress bar is to use the **tqdm** package. A simple pip install will get you going. I have been using `tqdm` for a long time may it be for fun side projects or production code.

## The Task
Recently I was implementing a **fully connected neural network** using just the **NumPy** library and comparing its performance with popular deep learning frameworks **TensorFlow** and **PyTorch**. Check out this [link](https://github.com/dinesh-GDK/mnist_comparison) if you are interested in this project.

It is important to monitor the loss of the model as it is training and the best way according to me is to implement a progress bar that can track the amount of training completed and the loss at that point.

TensorFlow comes with this feature out of the box, which is very good. On the other hand in PyTorch we have to implement the training loop and a progress bar if we need it. Also, I wanted a progress bar for my NumPy implementation. So I used `tqdm` to implement it.

## What!!!
I implemented a progress bar such that I update it for every iteration. With this implementation, for the same dataset with the same number of epochs and with the same parameters, my custom implementation and PyTorch implementation ran 10 epochs for around 60 minutes, while the TensorFlow implementation finished the same task in just 25 minutes. What!!!

I thought it was because Tensorflow may be utilizing some optimization to run faster. So out of curiosity, I started to dig deep, and, finally I found out that the progress bar was the culprit. Then I modified the progress bar to be updated after 500 iterations and tada!, both PyTorch and custom implementation ran under 10 minutes!!!

This also raised a question in my mind, What if the update cycle of the progress bar in TensorFlow is affecting its performance? Well, it could be.

## Example
Let's look at an example to make things clear

```python
from time import time
from tqdm import tqdm

LOOP = 50000

def task(update_cycle):
    pbar = tqdm(total=LOOP)
    for i, _ in enumerate(range(LOOP)):
        for _ in range(LOOP):
            pass
        
        if i % update_cycle == 0:
            pbar.update(update_cycle)
    
    pbar.close()

tic = time()
print(f'Update cycle: {1}')
task(1)
toc = time()
print(f'Time elapsed: {toc-tic:0.2f} seconds\n')

tic = time()
print(f'Update cycle: {500}')
task(500)
toc = time()
print(f'Time elapsed: {toc-tic:0.2f} seconds')
```

The output of the code
![Output]({{site.url}}/_img/tqdm-code-killer/output.png)

As we can see when the update cycle is big the task completes faster. I know it is a dumb example, but it gives the gist of the problem.

## Conclusion
`tqdm` is a fantastic package to implement progress bars. We can get a usable progress bar with just a single line of code and also it gives a wide range of customization. But next time when you implement a progress bar just make sure that it does not affect the performance.
