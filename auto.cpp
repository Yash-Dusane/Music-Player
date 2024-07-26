#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <cstring>  // for strerror
#include <cerrno>   // for errno
#include <dirent.h> // for POSIX directory operations

bool hasExtension(const std::string& filename, const std::string& extension) {
    size_t pos = filename.rfind('.');
    if (pos != std::string::npos) {
        std::string fileExtension = filename.substr(pos);
        return fileExtension == extension;
    }
    return false;
}

void listFilesRecursively(const std::string& directoryPath, std::vector<std::string>& resultList) {
    DIR* dir;
    struct dirent* entry;

    if ((dir = opendir(directoryPath.c_str())) != nullptr) {
        while ((entry = readdir(dir)) != nullptr) {
            if (entry->d_type == DT_DIR) {
                // Ignore "." and ".." directories
                if (std::strcmp(entry->d_name, ".") != 0 && std::strcmp(entry->d_name, "..") != 0) {
                    std::string subdirPath = directoryPath + "/" + entry->d_name;
                    listFilesRecursively(subdirPath, resultList);
                }
            } else if (entry->d_type == DT_REG) {
                std::string filename = entry->d_name;
                if (hasExtension(filename, ".mp3")) {
                    std::string foldername = directoryPath.substr(directoryPath.find_last_of("/") + 1);
                    resultList.push_back(foldername + "/" + filename);
                }
            }
        }
        closedir(dir);
    } else {
        std::cerr << "Error opening directory: " << strerror(errno) << std::endl;
    }
}

int main() {
    std::string songsDirectory = "songs";
    std::vector<std::string> resultList;

    listFilesRecursively(songsDirectory, resultList);

    std::ofstream outputFile("AlbumList.js");
    if (outputFile.is_open()) {
        outputFile << "var songs = [\n";
        for (size_t i = 0; i < resultList.size(); ++i) {
            outputFile << "  \"" << resultList[i] << "\"";
            if (i != resultList.size() - 1) {
                outputFile << ",";
            }
            outputFile << "\n";
        }
        outputFile << "];\n";
        outputFile.close();
        std::cout << "Successfully wrote songs list to songs.js\n";
    } else {
        std::cerr << "Error: Unable to open songs.js for writing.\n";
        return 1;
    }

    return 0;
}
