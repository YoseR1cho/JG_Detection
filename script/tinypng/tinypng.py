import os  # 导入os模块，用于文件和目录操作
import sys  # 导入sys模块，用于获取命令行参数等
import tinify  # 导入tinify模块，用于图片压缩

tinify.key = "Gk1YqJKF1bqbj075Zq3Tz2kL0Fpv4cHb"  # 设置Tinify的API密钥，用于认证和调用API


def format_size(size):
    # 将字节数转换为人类可读的格式
    for unit in ["B", "KB", "MB", "GB", "TB"]:  # 定义一个单位列表，从字节到太字节
        if size < 1024.0:  # 如果当前size小于1024字节
            return f"{size:.1f} {unit}"  # 返回格式化的size和单位
        size /= 1024.0  # 否则，将size除以1024，继续循环


def compress_images_in_directory(directory):
    print(f"文件夹:" + directory)  # 打印正在处理的文件夹路径
    original_total_size = 0  # 初始化原始图片总大小为0
    compressed_total_size = 0  # 初始化压缩后图片总大小为0

    # 遍历指定目录及其子目录
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".jpg") or file.endswith(".png") or file.endswith(".webp"):  # 检查文件扩展名是否为图片格式
                # 获取原始图片文件路径并计算其大小
                file_path = root + '/' + file
                original_size = os.path.getsize(file_path)
                original_total_size += original_size
                original_size_str = format_size(original_size)

                # 使用Tinify压缩图片

                source = tinify.from_file(file_path)

                source.to_file(file_path)  # 注意：这里直接覆盖了原始文件

                # 获取压缩后图片文件的大小
                compressed_size = os.path.getsize(file_path)
                compressed_total_size += compressed_size
                compressed_size_str = format_size(compressed_size)

                # 打印压缩日志
                print(f"已压缩文件 {file_path} ({original_size_str} -> {compressed_size_str})")

                # 递归处理子目录
        for dir in dirs:
            compress_images_in_directory(dir)

            # 打印压缩总结
    original_total_size_str = format_size(original_total_size)
    compressed_total_size_str = format_size(compressed_total_size)
    saved_space_str = format_size(original_total_size - compressed_total_size)  # 计算节省的空间大小

    # 这里可以添加代码来打印压缩总结，但代码片段中并未包含该部分
    print(f"压缩前总占用空间: {original_total_size_str}")
    print(f"压缩后总占用空间: {compressed_total_size_str}")
    print(f"已节省空间: {saved_space_str}")


# 打印出 rootDirectory 变量的值，这个变量之前应该已经被定义为某个目录的路径。
# 这里使用了Python 3.6+的f-string格式化功能来插入变量的值。打印出来的信息类似
# "根目录文件夹:/path/to/your/directory"。
# 调用 compress_images_in_directory 函数，并将 rootDirectory 作为参数传递。
# 这个函数会遍历 rootDirectory 目录及其所有子目录，找到所有的 .jpg、.png 和 .webp 图片文件，
# 并使用Tinify服务来压缩它们。压缩过程中，函数会打印出每个文件的原始大小和压缩后的大小，
# 并计算总的原始大小、总的压缩后大小和节省的空间。
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print('参数错误')
        sys.exit(1)

    rootDirectory = sys.argv[1]
    print(f"根目录文件夹:" + rootDirectory)

    compress_images_in_directory(rootDirectory)
