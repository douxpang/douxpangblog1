// module.exports = {
//   title: "VuePress 云开发网站应用示例",
//   description: "基于云开发的 VuePress 网站应用示例",
//   base: "/vuepress/",
//   themeConfig: {
//     nav: [
//       { text: "首页", link: "/" },
//       { text: "指南", link: "/guides/" },
//     ],
//   },
// };

// const sidebar = require("./siderbar.js");
module.exports = {
  title: "来块小饼吧？",
  description: "douxpang的博客",
  dest: "public",
  // "base": '/my_blog/',
  base: "/",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon1.ico",
      },
    ],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  plugins: [
    "@vuepress-reco/vuepress-plugin-comments",
    "vuepress-plugin-meting",
  ],
  theme: "reco",
  themeConfig: {
    mode: "light",
    subSidebar: "auto",
    valineConfig: {
      appId: "h6i7vXvVEK37fFFwb1DtMJ6W-gzGzoHsz",
      appKey: "cYI3hypnGAI00CPuzhNfeY8Q",
    },
    nav: [
      {
        text: "主页",
        link: "/",
        icon: "reco-up",
      },
      {
        text: "时间线",
        link: "/timeline/",
        icon: "reco-up",
      },
      {
        text: "Contact",
        icon: "reco-message",
        items: [
          {
            text: "GitHub",
            link: "https://github.com/douxpang/douxpangBlog",
            icon: "reco-github",
          },
          {
            text: "掘金",
            link: "https://juejin.cn/user/3773179638058088",
            icon: "reco-juejin",
          }
        ],
      },
    ],
   // sidebar,
    type: "blog",
    blogConfig: {
      category: {
        location: 2,
        text: "分类",
      },
      tag: {
        location: 3,
        text: "标签",
      },
      socialLinks: [     // 信息栏展示社交信息
        { icon: 'reco-github', link: 'https://github.com/recoluan' },
        { icon: 'reco-npm', link: 'https://www.npmjs.com/~reco_luan' }
      ]
    },
    logo: "/logo.jpg",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    author: "douxpang",
    authorAvatar: "/avatar.jpeg",
    record: "xxxx",
    startYear: "2021",
  },
  markdown: {
    lineNumbers: true,
  },
};
