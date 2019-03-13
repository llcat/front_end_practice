/*
* profile配置项
*
*/
const profileConfig = {
    basicInfo: {
        name: "余品隆",
        phone: "17612709402",
        email: "17612709402@163.com",
        blog: "https://llcat.github.io",
        hopefulPosition: "web前端开发工程师",
        hopefulLocation: "武汉",
        hopefulSalary: "8K~10K"
    },
    skills: [
        {
            category: "语言",
            icon: "",
            data: [
                "JavaScript(ES6)",
                "Java",
                "Python3"
            ]
        },
        {
            category: "框架&Libs",
            icon: "",
            data: [
                "Vue.js, Vue Router, Vuex",
                "React.js, react-router, redux",
                "Element UI, Antd",
                "Echarts"
            ]
        },
        {
            category: "平台",
            icon: "",
            data: [
                "移动端web应用开发",
                "Android应用开发",
            ]
        },
        {
            category: "工具&系统",
            icon: "",
            data: [
                "Git, Docker, Nginx, Webpack",
                "熟悉Linux(Ubuntu)系统及各类命令行工具",
            ]
        },
    ],
    workExperience: {
        company: [
            {
                id: 1,
                companyName: "武汉富士康科技集团",
                time: "2017/07 ~ 至今",
                position: "软件开发工程师",
                department: "Software Department/App Dev Team",
                workContent: [
                    "1. 完成公司web应用的开发工作。",
                    "2. 负责大屏自动贩卖机上运行的Android应用的开发，维护，升级工作。",
                    "3. 部门CI平台搭建。",
                    "4. 自动化工具开发。",
                    "5. 新技术的调研及应用。"
                ]
            }
        ],
        project: [
            {
                companyId: 1,
                relationPriority: 1,
                timePriority: 2,
                projectName: "自动贩卖机管理平台移动端web app",
                time: "2018/07 ~ 2018/12",
                projectDuty: "完成登陆，数据中心，运营中心，故障信息查看等功能页的开发工作，主要负责销售报表可视化工作，机台销售数据，商品销售数据的日报，周报，月报图表化的实现。方便客户在移动端设备上能方便的查看各类销售数据。并实现客户聚落下机台信息查询，状态及售卖套餐查看，修改，机台故障信息汇总等功能。",
                usedTechStack: [
                    "1. 基于Vue.js和Element UI组件库封装各类功能组件。",
                    "2. 基于Echarts提供数据可视化能力，提供折线图，饼图，直方图等图表从多维度展示销售数据。",
                    "3. 基于jquey.soap库，ES6新特性promise封装请求工具类，支持与后台webservice接口通信。",
                    "4. 使用localforage库提供本地数据存储能力。好处在于可以简化存储的使用并优先使用IndexDB做存储。",
                    "5. 使用了vue router及vuex做路由及状态管理。"
                ]
            },
            {
                companyId: 1,
                relationPriority: 2,
                timePriority: 4,
                projectName: "自动贩卖机Android App",
                time: "2017/07 ~ 2017/12",
                projectDuty: "负责维护和升级公司大屏自动贩卖机上运行的App，主要负责与用户对接各品牌商活动的应用换肤需求，及应用优化和新需求开发等工作。如通过webview提供js与android交互能力，为客户的商品售卖web页面提供机台库存查询，控制机台出货，使用扫描枪的能力。参与贩卖机系统HTTP接口安全升级工作，设计加密规则。",
                usedTechStack: [
                    "1. 需要使用到android的各类布局及控件复原客户的设计稿，会简单的photoshop的使用，主要是从设计稿中切会用的素材。",
                    "2. 需要掌握android平台webview控件的使用，熟悉webview控件提供的能力及各种配置项。",
                    "3. 对网络安全有一定的了解，知道如何组合内容摘要算法，对称加密算法提高接口的安全性。了解常用的通信协议如HTTP/HTTPS等。",
                ]
            },
            {
                companyId: 1,
                relationPriority: 3,
                timePriority: 3,
                projectName: "团队CI平台搭建及维护",
                time: "2018/02 ~ 2018/5",
                projectDuty: "参与了团队持续集成平台的搭建及维护工作，负责其中的nexus私有仓库及sonarqube代码质量检测平台的搭建，负责与jenkins，gerrit平台整合协同完成各类型项目的构建工作，负责调研Docker容器化技术的在CI平台中的应用。",
                usedTechStack: [
                    "1. 使用了Docker Services简化了nexus和sonarqube平台的搭建，部署，维护工作。通过编写docker-compose.yml文件来组合，部署服务。服务数据的存储采用了docker volumes数据卷，迁移到其他机器时无需改配置。",
                    "2. 使用Rsync工具做数据备份。",
                    "3. 需要有远程通过ssh服务熟练运用命令行工具操作linux系统。"
                ]
            },
            {
                companyId: 1,
                relationPriority: 4,
                timePriority: 1,
                projectName: "自动化工具开发",
                time: "2019/01 ~ 2019/02",
                projectDuty: "独立完成一些小的自动化开发工具，如为部门测试团队开发测试报告生成工具，解决了测试团队需要从PC厂商提供的测试工具生成的zip档日志文件中手动拷贝大量数据到excel表格中的重复繁琐工作的问题",
                usedTechStack: [
                    "1. 使用python提供的zipfile lib完成zip档日志文件的解压。",
                    "2. 使用正则表达式从相关的log日志中获取信息。",
                    "3. 使用openpyxl向模板测试报告excel表格中填充数据。"
                ]
            },
        ]
    },

    personalEvaluation: {
        content: "学习能力较强，对新的工具和技术能快速上手，有丰富的计算机技术领域相关的知识，对各类技术栈都有研究。缺点是没有特别精通的领域，但如果你需要一个能力均衡的工程师，相信我会是不错的选择。"
    }
};

export default profileConfig