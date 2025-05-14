import os

# 取得目前工作目錄
current_dir = os.getcwd()

# 列出該目錄下所有檔案與資料夾
files = os.listdir(current_dir)

# 只印出檔案（不包含資料夾）
for f in files:
    if os.path.isfile(os.path.join(current_dir, f)):
        print(f)

