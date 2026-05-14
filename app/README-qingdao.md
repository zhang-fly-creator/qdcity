# 青岛老建筑时光伴游

当前版本为静态演示版，基于 LearningCell 改造，用于展示青岛穿越伴游地图与老建筑 3D 展厅的整体体验。

本项目通过“线上 3D 建筑展示 + 线下 AI 伴游小程序打卡”的方式，将老建筑模型、历史人物、城市路线和实地游览任务连接起来。游客可在线上了解建筑故事，到达现场后扫码进入小程序，完成 AI 导览、拍照打卡、研学观察和数字徽章领取。

本项目将“线上 3D 建筑展示”和“线下 AI 伴游小程序打卡”连接起来。游客可在线上查看青岛老建筑模型和故事，到达现场后扫码进入小程序，激活对应建筑的历史人物或 AI 讲述人，完成现场导览、观察任务、拍照打卡，并领取数字徽章。后续可扩展 GPS 到场解锁、NFC 建筑徽章和城市路线任务。

## 当前能力

- 青岛穿越伴游地图首页
- 10 个代表性老建筑点位
- 点击建筑进入 3D 展厅
- 3D 模型旋转、缩放、复位
- 建筑档案、相关人物、历史故事、AI 讲解二维码占位
- 支持后续替换真实 GLB 建筑模型和建筑图片

## 资源替换规则

真实建筑模型放入：

`app/public/models/qingdao/`

建议文件名：

- `governor-house.glb`
- `governor-office.glb`
- `jiangsu-church.glb`
- `st-michael-cathedral.glb`
- `qingdao-railway-station.glb`
- `post-museum.glb`
- `tsingtao-brewery.glb`
- `laoshe-house.glb`
- `kang-youwei-house.glb`
- `huashi-building.glb`

真实建筑封面图放入：

`app/public/images/buildings/`

建议文件名：

- `governor-house.jpg`
- `governor-office.jpg`
- `jiangsu-church.jpg`
- `st-michael-cathedral.jpg`
- `qingdao-railway-station.jpg`
- `post-museum.jpg`
- `tsingtao-brewery.jpg`
- `laoshe-house.jpg`
- `kang-youwei-house.jpg`
- `huashi-building.jpg`

首页地图插画放入：

`app/public/images/map/qingdao-time-map.png`

## Cloudflare Pages 部署

Cloudflare Pages 构建配置建议：

- Root directory: `app`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: 建议使用 `20` 或 `22`

如果项目部署在根域名，不需要额外设置 `VITE_BASE`。如果部署在子路径，可根据需要设置 `VITE_BASE`。

## 资源体积提醒

- 大模型建议压缩后再部署
- 建议使用 `gltf-transform optimize` 做模型压缩
- `scene.glb` 不要在首页以外页面预加载
- 单栋建筑模型和城市全景模型都应放在 `app/public/models/qingdao/`
- Cloudflare Pages 上传大文件前，请确认文件大小和构建时间
