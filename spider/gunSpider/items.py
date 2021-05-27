# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

from sys import platform
import scrapy


class GunspiderItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    platform = scrapy.Field()
    href = scrapy.Field()
    name = scrapy.Field()
    type = scrapy.Field()
    color = scrapy.Field()
    star = scrapy.Field()
    mosun = scrapy.Field()
    img = scrapy.Field()
    num = scrapy.Field()
    price = scrapy.Field()
    date = scrapy.Field()
