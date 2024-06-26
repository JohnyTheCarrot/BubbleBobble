cmake_minimum_required(VERSION 3.5)

project(BubbleBobble LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

FILE(GLOB Scripts src/scripts/*.js)
FILE(GLOB Scenes scenes/*.json)

add_executable(${PROJECT_NAME}
	src/main.cpp

	${Scripts}
	${Scenes}
)

include(GNUInstallDirs)
install(TARGETS BubbleBobble
	LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
	RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}
)

include(FetchContent)

FetchContent_Declare(
	Roingine
	GIT_REPOSITORY	https://github.com/JohnyTheCarrot/Roingine.git
	GIT_TAG 		aa93378497854c159d4a35a91b39c3423b32a91d
	GIT_SHALLOW TRUE
)

FetchContent_MakeAvailable(Roingine)

target_link_libraries(${PROJECT_NAME} PRIVATE Roingine)
target_include_directories(${PROJECT_NAME} PRIVATE Roingine)


FetchContent_Declare(
	SDL2
	URL https://www.libsdl.org/release/SDL2-devel-2.28.5-VC.zip
	DOWNLOAD_NO_PROGRESS ON
	DOWNLOAD_DIR ${CMAKE_BINARY_DIR}/downloads
)
FetchContent_GetProperties(SDL2)
if (NOT sdl2_POPULATED)
	FetchContent_Populate(SDL2)
endif ()

set(SDL2_INCLUDE_DIR ${sdl2_SOURCE_DIR}/include)
if (${CMAKE_SIZEOF_VOID_P} MATCHES 8)
	set(SDL2_LIBRARIES "${sdl2_SOURCE_DIR}/lib/x64/SDL2.lib;${sdl2_SOURCE_DIR}/lib/x64/SDL2main.lib")
	set(SDL2_LIBRARY_DLL "${sdl2_SOURCE_DIR}/lib/x64/SDL2.dll")
else ()
	set(SDL2_LIBRARIES "${sdl2_SOURCE_DIR}/lib/x86/SDL2.lib;${sdl2_SOURCE_DIR}/lib/x86/SDL2main.lib")
	set(SDL2_LIBRARY_DLL "${sdl2_SOURCE_DIR}/lib/x86/SDL2.dll")
endif ()

FetchContent_Declare(
	SDL2_mixer
	URL https://www.libsdl.org/projects/SDL_mixer/release/SDL2_mixer-devel-2.0.4-VC.zip
	DOWNLOAD_NO_PROGRESS ON
	DOWNLOAD_DIR ${CMAKE_BINARY_DIR}/downloads
)
FetchContent_GetProperties(SDL2_mixer)
if (NOT sdl2_mixer_POPULATED)
	FetchContent_Populate(SDL2_mixer)
endif ()
set(SDL2_MIXER_INCLUDE_DIR ${sdl2_mixer_SOURCE_DIR}/include)
if (${CMAKE_SIZEOF_VOID_P} MATCHES 8)
	set(SDL2_MIXER_LIBRARIES "${sdl2_mixer_SOURCE_DIR}/lib/x64/SDL2_mixer.lib")
	set(SDL2_MIXER_LIBRARY_DLL "${sdl2_mixer_SOURCE_DIR}/lib/x64/SDL2_mixer.dll")
else ()
	set(SDL2_MIXER_LIBRARIES "${sdl2_mixer_SOURCE_DIR}/lib/x86/SDL2_mixer.lib")
	set(SDL2_MIXER_LIBRARY_DLL "${sdl2_mixer_SOURCE_DIR}/lib/x86/SDL2_mixer.dll")
endif ()

# add SDL2_image
FetchContent_Declare(
	SDL2_image
	URL https://www.libsdl.org/projects/SDL_image/release/SDL2_image-devel-2.8.2-VC.zip
	DOWNLOAD_NO_PROGRESS ON
	DOWNLOAD_DIR ${CMAKE_BINARY_DIR}/downloads
)
FetchContent_GetProperties(SDL2_image)
if (NOT sdl2_image_POPULATED)
	FetchContent_Populate(SDL2_image)
endif ()
set(SDL2_IMAGE_INCLUDE_DIR ${sdl2_image_SOURCE_DIR}/include)
if (${CMAKE_SIZEOF_VOID_P} MATCHES 8)
	set(SDL2_IMAGE_LIBRARIES "${sdl2_image_SOURCE_DIR}/lib/x64/SDL2_image.lib")
	set(SDL2_IMAGE_LIBRARY_DLL "${sdl2_image_SOURCE_DIR}/lib/x64/SDL2_image.dll")
else ()
	set(SDL2_IMAGE_LIBRARIES "${sdl2_image_SOURCE_DIR}/lib/x86/SDL2_image.lib")
	set(SDL2_IMAGE_LIBRARY_DLL "${sdl2_image_SOURCE_DIR}/lib/x86/SDL2_image.dll")
endif ()

# add SDL2_ttf
FetchContent_Declare(
	SDL2_ttf
	URL https://www.libsdl.org/projects/SDL_ttf/release/SDL2_ttf-devel-2.20.2-VC.zip
	DOWNLOAD_NO_PROGRESS ON
	DOWNLOAD_DIR ${CMAKE_BINARY_DIR}/downloads
)
FetchContent_GetProperties(SDL2_ttf)
if (NOT sdl2_ttf_POPULATED)
	FetchContent_Populate(SDL2_ttf)
endif ()
set(SDL2_TTF_INCLUDE_DIR ${sdl2_ttf_SOURCE_DIR}/include)
if (${CMAKE_SIZEOF_VOID_P} MATCHES 8)
	set(SDL2_TTF_LIBRARIES ${sdl2_ttf_SOURCE_DIR}/lib/x64/SDL2_ttf.lib)
	set(SDL2_TTF_LIBRARY_DLL "${sdl2_ttf_SOURCE_DIR}/lib/x64/SDL2_ttf.dll")
else ()
	set(SDL2_TTF_LIBRARIES ${sdl2_ttf_SOURCE_DIR}/lib/x86/SDL2_ttf.lib)
	set(SDL2_TTF_LIBRARY_DLL "${sdl2_ttf_SOURCE_DIR}/lib/x86/SDL2_ttf.dll")
endif ()

# add post build commands
foreach(script ${Scripts})
	get_filename_component(FILENAME "${script}" NAME_WLE)
	configure_file(${script} "scripts/${FILENAME}.js" COPYONLY)
endforeach()
foreach(scene ${Scenes})
	get_filename_component(FILENAME "${scene}" NAME_WLE)
	configure_file(${scene} "scenes/${FILENAME}.json" COPYONLY)
endforeach()
FILE(GLOB Images res/img/*.*)
foreach(img ${Images})
	get_filename_component(DIR "${img}" DIRECTORY)
	get_filename_component(FILENAME "${img}" NAME)
	configure_file(${img} "res/img/${FILENAME}.${EXTENSION}" COPYONLY)
endforeach()

add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
	COMMAND "${CMAKE_COMMAND}" -E copy "${SDL2_LIBRARY_DLL}" "$<TARGET_FILE_DIR:${PROJECT_NAME}>"
)
add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
	COMMAND "${CMAKE_COMMAND}" -E copy "${SDL2_IMAGE_LIBRARY_DLL}" "$<TARGET_FILE_DIR:${PROJECT_NAME}>"
)
add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
	COMMAND "${CMAKE_COMMAND}" -E copy "${SDL2_TTF_LIBRARY_DLL}" "$<TARGET_FILE_DIR:${PROJECT_NAME}>"
)
add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
	COMMAND "${CMAKE_COMMAND}" -E copy "${SDL2_MIXER_LIBRARY_DLL}" "$<TARGET_FILE_DIR:${PROJECT_NAME}>"
)
