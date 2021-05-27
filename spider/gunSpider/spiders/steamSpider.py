from gunSpider.items import GunspiderItem
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
import scrapy
import time
import re
import json
import copy


class steamSpider(scrapy.Spider):
    name = 'steamSpider'

    start_urls = [
        'https://steamcommunity.com/market/search/render/?query=&start={}&count=100&search_descriptions=0&sort_column=name&sort_dir=desc&appid=730&category_730_ItemSet%5B%5D=any&category_730_ProPlayer%5B%5D=any&category_730_StickerCapsule%5B%5D=any&category_730_TournamentTeam%5B%5D=any&category_730_Weapon%5B%5D=any&category_730_Type%5B%5D=tag_CSGO_Type_Knife'.format(str(i)) for i in range(0,2301,100)
    ]

    def parse(self, response):
        item = GunspiderItem()
        date = '2021-05-27, 8:42:00'

        html = response.text
        html = html.replace('\\', '')
        # 价格
        prices1 = re.findall('¥\s*[0-9\.,]*', html)
        prices2 = re.findall('\$\s*[0-9\.,]*', html)
        # 人数
        nums = re.findall('>[0-9]+<', html)
        # 名字
        names = re.findall('[\u4e00-\u9fa5\sa-zA-Z0-9]+（★\s?[a-zA-Z]*™*）\s*\|*\s*[\u4e00-\u9fa5\sa-zA-Z0-9]*\s*\(*[\u4e00-\u9fa5]*\)*', html)
        # 链接
        hrefs = re.findall('href="https://[0-9a-zA-Z/%\.\-_]*', html)
        # 图片
        imgs = re.findall('src="https://[0-9a-zA-Z/%\.\-_]*', html)
        # 链接

        for i in range(len(names)):
            str_ = names[i].replace(' ', '')
            str_ = str_.replace('|', '')
            str_ = str_.replace('(', '|')
            str_ = str_.replace(')', '')
            str_ = str_.replace('（', '|')
            str_ = str_.replace('）', '|')
            strs = str_.split('|')

            type = strs[0]
            color = strs[2]
            if len(re.findall('StatTrak', names[i])) == 0:
                star = '无'
            else:
                star = '有'
            if len(strs) < 4:
                mosun = ''
            else:
                mosun = strs[3]

            num = nums[i].replace('<', '')
            num = num.replace('>', '')

            item['platform'] = 'steam'
            item['name'] = names[i]
            item['href'] = hrefs[i]
            item['type'] = type
            item['color'] = color
            item['star'] = star
            item['mosun'] = mosun
            item['img'] = imgs[i]
            item['num'] = num
            if len(prices1) == 200:
                item['price'] = prices1[i + i + 1]
            elif len(prices2) == 200:
                item['price'] = prices2[i + i + 1]
            else:
                item['price'] = ''
            item['date'] = date
            yield item