# 采样与混叠仿真台（仿真式，camera/mic 共用）

两种模式演示同一个 Nyquist 采样定理：

- 轮子模式（camera 帧采样）：车轮错觉——超过 Nyquist 后正转变倒转/静止，附旋转相位图与视觉转速公式；
- 声波模式（mic 采样）：正弦波被低采样率采样后重建成低频假波，可开「抗混叠滤波」观察高频成分在采样前被抑制。

对应文档：`docs/sensing/camera/temporal-sampling.md`、`docs/sensing/mic/aliasing.md`
