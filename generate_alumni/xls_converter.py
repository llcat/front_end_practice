"""
    convert *.xls to json format data
    eg:
    {
        "id": 1,
        "name": "xxx",
        "start_letter": "Y",
        "phone": ["xxxxx", "xxxxx"],
        "wx": "xxxxx",
        "qq": "xxxxx",
        "mail": "xxxxx",
        "address": "xxxx"
    }
"""
import xlrd
import re
import json


def read_table(file_name, index=0):
    try:
        work_book = xlrd.open_workbook(file_name)
        work_table = work_book.sheet_by_index(index)
        return work_table
    except Exception as e:
        print(e)


def convert_to_json(work_table, start_index=None, file_name=None, template=None):
    if work_table is None or start_index is None or file_name is None or template is None:
        print("please check params")
        return None
    # 该excel有效总行数及有效总列数
    total_row_num = work_table.nrows
    total_col_num = work_table.ncols
    info_list = []
    for ri in range(start_index[0], total_row_num):
        if len(work_table.cell(ri, 1).value) > 0:
            template['id'] = int(work_table.cell(ri, 0).value)
            template['name'] = work_table.cell(ri, 1).value
            phone = work_table.cell(ri, 2).value
            if isinstance(phone, str):
                if len(phone) > 0:
                    # 自己填的电话号码格式不对
                    phone = phone.replace("    ", "\n")
                    if len(phone) > 11:
                        # 切分填了两个电话的
                        phone_list = re.split(r"[\n/]", phone)
                        template['phone'] = phone_list
                else:
                    template['phone'] = phone
            elif isinstance(phone, float):
                template['phone'] = [str(phone)[:11]]

            wx = work_table.cell(ri, 3).value
            qq = work_table.cell(ri, 4).value
            if isinstance(wx, float):
                template['wx'] = str(wx)[:-2]
            else:
                template['wx'] = str(wx)

            if isinstance(qq, float):
                template['qq'] = str(qq)[:-2]
            else:
                template['qq'] = str(qq)

            template['mail'] = work_table.cell(ri, 5).value
            template['address'] = work_table.cell(ri, 6).value

            info_list.append(template.copy())

    # 写入json文件
    with open(file_name, 'w', encoding="utf-8") as json_alumni:
        print(info_list)
        json.dump(info_list, json_alumni, ensure_ascii=False)


if __name__ == "__main__":
    t = read_table("alumni.xls")
    info_template = {
        "id": "",
        "name": "",
        "phone": [],
        "wx": "",
        "qq": "",
        "mail": "",
        "address": "",
        "sex": "",
        "start_letter": "",
    }
    convert_to_json(t, (2, 0), "alumni.json", info_template)
