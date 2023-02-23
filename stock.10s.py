#!/usr/bin/env /Users/mac/.pyenv/shims/python
# -*- coding: utf-8 -*-

# <xbar.title>股票提示</xbar.title>
# <xbar.version>v0.1</xbar.version>
# <xbar.author>iamxz</xbar.author>
# <xbar.author.github>iamxz</xbar.author.github>
# <xbar.desc>沪深股票提醒.</xbar.desc>
# <xbar.abouturl></xbar.abouturl>

import easyquotation

quotation = easyquotation.use('qq') # 新浪 ['sina'] 腾讯 ['tencent', 'qq']

def show(type,num):
    abc = quotation.real(type+ num)
    
    a = abc[num]['now']
    b = abc[num]['open']
    c = (a-b)*100 / b
    if a > b:
        print('%.3f ↑ %.2f%%| color=red'  % (a,c))
    elif a < b:
        print('%.3f ↓ %.2f%%| color=green' % (a,c))
    else:
        print('%.3f ↑'% (a))

# 上证 恒生互联
show('sh','513330')
# show('sz','000625')

