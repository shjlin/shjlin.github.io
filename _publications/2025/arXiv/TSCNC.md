---
title: "(arXiv Preprint) Lipschitz Constant Meets Condition Number: Learning Robust and Compact Deep Neural Networks"
collection: publications
category: manuscripts
permalink: /publication/2025/arXiv/TSCNC
excerpt: ''
date: 2025-03-26
venue: 'arXiv'
paperurl: 'https://arxiv.org/abs/2503.20454'
citation: 'Y. Feng*, S.-H. J. Lin*, B. Gao and X. Wei, "Lipschitz Constant Meets Condition Number: Learning Robust and Compact Deep Neural Networks," in arXiv preprint 2503.20454, 2025.'
---

Recent research has revealed that high compression of Deep Neural Networks (DNNs), e.g., massive pruning of the weight matrix of a DNN, leads to a severe drop in accuracy and susceptibility to adversarial attacks. Integration of network pruning into an adversarial training framework has been proposed to promote adversarial robustness. It has been observed that a highly pruned weight matrix tends to be ill-conditioned, i.e., increasing the condition number of the weight matrix. This phenomenon aggravates the vulnerability of a DNN to input noise. Although a highly pruned weight matrix is considered to be able to lower the upper bound of the local Lipschitz constant to tolerate large distortion, the ill-conditionedness of such a weight matrix results in a non-robust DNN model. To overcome this challenge, this work develops novel joint constraints to adjust the weight distribution of networks, namely, the Transformed Sparse Constraint joint with Condition Number Constraint (TSCNC), which copes with smoothing distribution and differentiable constraint functions to reduce condition number and thus avoid the ill-conditionedness of weight matrices. Furthermore, our theoretical analyses unveil the relevance between the condition number and the local Lipschitz constant of the weight matrix, namely, the sharply increasing condition number becomes the dominant factor that restricts the robustness of over-sparsified models. Extensive experiments are conducted on several public datasets, and the results show that the proposed constraints significantly improve the robustness of a DNN with high pruning rates.
