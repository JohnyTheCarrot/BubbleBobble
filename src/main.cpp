#include <roingine/engine_event_queue.h>
#include <roingine/game_time.h>
#include <roingine/roingine.h>
#include <roingine/scene.h>
#include <roingine/scene_loader.h>
#include <roingine/scene_manager.h>

int main()
{
    roingine::Engine roingine{"Bubble Bobble", 774, 676};
    roingine::KeyboardInput::Provide(std::make_unique<roingine::SDLKeyboardInputService>());

    roingine::Scene scene{roingine::scene_loader::LoadScene("scenes/level1.json")};
    roingine::SceneManager::GetInstance().SetActive(std::move(scene));

    std::size_t currentLevelIdx{0};
    bool shouldLoad{false};
    std::vector<std::string_view> scenes{"scenes/level1.json",
                                         "scenes/level2.json",
                                         "scenes/level3.json"};

    int numEnemies{};

    auto loadNext{[&]() {
        roingine::Scene scene{roingine::scene_loader::LoadScene(scenes.at(++currentLevelIdx))};
        roingine::SceneManager::GetInstance().SetActive(std::move(scene));
        numEnemies = 0;
    }};

    auto handle{
        roingine::event_queue::EventQueue::GetInstance()
            .AttachEventHandler<roingine::event_queue::EventType::ScriptEvent>([&](auto &data) {
                if (data.eventName == "enemySpawned")
                    ++numEnemies;
                else if (data.eventName == "enemyDied" && --numEnemies == 0) {
                    shouldLoad = true;
                } else if (data.eventName == "nextLevelRequested") {
                    loadNext();
                }
            })};

    float timePassed{0.f};
    constexpr float TIME_TO_LOAD_SEC{6.f};
    roingine.Run([&]() {
        if (shouldLoad) {
            if (timePassed >= TIME_TO_LOAD_SEC) {
                loadNext();
                timePassed = 0.f;
                shouldLoad = false;
            } else
                timePassed += roingine::GameTime::GetInstance().GetDeltaTime();
        }
    });
}
