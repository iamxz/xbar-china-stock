#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# <xbar.title>股票提示</xbar.title>
# <xbar.version>v0.1</xbar.version>
# <xbar.author>iamxz</xbar.author>
# <xbar.author.github>iamxz</xbar.author.github>
# <xbar.desc>沪深股票提醒.</xbar.desc>
# <xbar.dependencies>xbar-china-stock</xbar.dependencies>
# <xbar.image>https://github.com/iamxz/xbar-china-stock/blob/main/preview.png</xbar.image>
# <xbar.abouturl>https://github.com/iamxz/xbar-china-stock</xbar.abouturl>

import easyquotation

quotation = easyquotation.use('qq') # 新浪 ['sina'] 腾讯 ['tencent', 'qq']

def show(type,num):
    data = quotation.real(type+ num)
    
    now = data[num]['now']
    open = data[num]['open']
    if open:
        p = (now-open)*100 / open
        if now > open:
            print('%.3f ↑ %.2f%%| color=red'  % (now,p))
        elif now < open:
            print('%.3f ↓ %.2f%%| color=green' % (now,p))
        else:
            print('%.3f '% (now))
    else:
        print('%.3f '% (now))
    

# 上证 恒生互联
show('sh','513330')
