# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface

from itemadapter import ItemAdapter
import pymongo
import pandas

class MongoDBPipeline(object):
    def open_spider(self, spider):
        self.db_client = pymongo.MongoClient(
            'mongodb://root:zuoqiugaoxi@123.57.213.26:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false')
        self.db = self.db_client['knife']
        self.coll = self.db['knife']
        self.content = self.coll.find({}).distinct('_id')

    def close_spider(self, spider):
        self.db_client.close()

    def process_item(self, item, spider):
        self.insert_db(item)
        return item

    def insert_db(self, item):
        if item['name'] in self.content:
            self.coll.update_one(
                {'_id': item['name']},
                {
                    '$pull': {item['platform'] + '.prices' : {'date': item['date']}}
                }
            )
            self.coll.update_one(
                {'_id': item['name']},
                {
                    '$set': {
                        item['platform'] + '.href': item['href'],
                        item['platform'] + '.img': item['img'],
                        item['platform'] + '.current_price' : item['price'] ,
                        item['platform'] + '.num' : item['num'],
                    }
                }
            )
            self.coll.update_one(
                {'_id': item['name']},
                {
                    '$push': {
                        item['platform'] + '.prices' : { 'date': item['date'], 'price': item['price']}}
                }
            )
        else:
            self.coll.insert_one(
                {
                    '_id': item['name'],
                    'type': item['type'],
                    'color': item['color'],
                    'mosun': item['mosun'],
                    'star': item['star'],
                    item['platform']: {
                        'href': item['href'],
                        'img': item['img'],
                        'current_price' : item['price'] ,
                        'num' : item['num'],
                        'prices': [{'date': item['date'], 'price': item['price']}]
                    }
                }
            )