import pymongo

# db_client = pymongo.MongoClient('mongodb://root:zuoqiugaoxi@123.57.213.26:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false')
# db = db_client['knife'].knife

# db.update_one({'_id': '蝴蝶刀（★） | 渐变之色 (崭新出厂)'}, {
#                      '$pull': { 'igxe.prices' : {'date': '2021-05-22'}}})
# db.update_one({'_id': '蝴蝶刀（★） | 渐变之色 (崭新出厂)'}, {
#                       '$push': { 'igxe.prices' : {'date': '2021-05-22', 'price': '你猜'}}})

# db.update_one({'_id': '蝴蝶刀（★） | 渐变之色 (崭新出厂)'}, {'$pull': {'steam.prices': {'date': 'aa'}}})
# db.update_many({}, {'$unset': {'c5game': ''}})
# db.update_many(
#     {},
#     {
#         '$pull': {'igxe.prices': {'date': '2021-05-27, 8:42:00'}}
#     }
# )

# db.update_many(
#    { 'steam.prices.date': '2021-05-25, 08:50:00', 'steam.prices.price': ''},
#    { '$unset': { "steam.prices" : '' } }
# )

# for i in db.find( { 'steam.prices': {'date' : '2021-05-25, 08:50:00', 'price': ''}}):
#     print(i)
# db.update_many(
#    {},
#    { '$set': { "steam.prices.0.date" : '2021-05-25, 08:50:00' } }
# )

# db.update_one({'_id': '蝴蝶刀（★） | 渐变之色 (崭新出厂)'}, {'$push': {'steam.prices': {'date': 'aa', 'price': 'bb'}}})
# db.update_one(
#     {'_id': '蝴蝶刀（★） | 渐变之色 (崭新出厂)'},
#         {
#             '$set': {'steam.current_price': 'bb', 'steam.num': 'ee','steam.href': 'cc', 'steam.img': 'dd'}
#         }
# )
# db.insert_one( {"_id": "222",
#     "array": [{
#         "name": "a",
#         "prise": "11"
#     }, {
#         "name": "b",
#         "prise": "12"
#     }, {
#         "name": "d",
#         "prise": "11"
#     }, {
#         "name": "d",
#         "prise": "11"
#     }]})
# db.update_one({'_id' : '111'}, { '$pull' : {'array' : {'name' : 'c'}}})
# db.update_one({'_id' : '222'}, { '$push' : {'array' : {'name':'d', 'prise' : '11'}}})
# db.find({})
# print(db.find({}).distinct('_id'))
# db_client.close()
# db_client.close()s
import json

with open('knife.json', 'r', encoding='utf8') as f:
    knifes = json.load(f)

names = ['igxe','c5game','steam']

for name in names:
    for knife in knifes:
        if name in knife.keys():
            if 'prices' in knife[name].keys():
                if 'href' in knife[name].keys():
                    pass
                else:
                    del knife[name]

with open('knife.json',"w+",encoding='utf8') as f:
    json.dump(knifes,f)
    print("加载入文件完成...")