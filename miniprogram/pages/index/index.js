const app = getApp();

Page({
  data: {
    formData: {
      name: '',
      gender: '',
      birthday: ''
    },
    generatedNames: null,
    isGenerating: false
  },

  // 输入处理
  onNameInput(e) {
    const value = e.detail.value;
    this.setData({
      'formData.name': value
    });
  },

  // 性别选择
  onGenderChange(e) {
    const value = e.detail.value;
    this.setData({
      'formData.gender': value
    });
  },

  // 生日选择
  onBirthdayChange(e) {
    const value = e.detail.value;
    this.setData({
      'formData.birthday': value
    });
  },

  // 生成名字
  generateNames() {
    const { name, gender, birthday } = this.data.formData;
    
    if (!name || !gender || !birthday) {
      wx.showToast({
        title: '请填写所有必填项',
        icon: 'none'
      });
      return;
    }

    this.setData({ isGenerating: true });

    // 模拟生成过程（实际应调用API或本地算法）
    setTimeout(() => {
      // 这里应该调用与Web版相同的生成逻辑
      const popularName = {
        name: '明凯',
        pinyin: 'Ming Kai',
        meaning: '光明开朗，才华横溢'
      };
      
      const fashionableName = {
        name: '思睿',
        pinyin: 'Si Rui',
        meaning: '思维敏捷，智慧过人'
      };
      
      const traditionalName = {
        name: '文轩',
        pinyin: 'Wen Xuan',
        meaning: '文采飞扬，气宇轩昂'
      };

      this.setData({
        generatedNames: {
          popular: popularName,
          fashionable: fashionableName,
          traditional: traditionalName
        },
        isGenerating: false
      });

      wx.showToast({
        title: '生成成功！',
        icon: 'success'
      });
    }, 1500);
  },

  // 保存图片
  saveImage() {
    wx.showToast({
      title: '功能开发中...',
      icon: 'none'
    });
  },

  onLoad() {
    // 页面加载时的初始化
  }
});