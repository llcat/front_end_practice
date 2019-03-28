### mini-project

- Accounts 
  - sign up with username and password, no need to verify
  - Login with username and password
  - Logout button
- Upload video (can be minimal) 
  - Upload button
  - Choose from computer
  - Show upload progress
- View all videos (gallery)
  - Favorite a video (button)
  - Show watched videos (status)
  - Show the progress of in progress videos (status)
  - Delete videos (button)
- Watch the video (video player, Individual view (can be a modal)

#### how to run it ?

- 安装
`npm install`

- 运行
`npm start`

#### tips
- 如需更改访问azure接口地址,在文件`./src/api/Api.js`中。
- 记得给你的Blob存储和FuctionApp配置跨域，在FuctionApp的平台中选择cors,并配置允许本地地址`http://localhost:3000`访问。
