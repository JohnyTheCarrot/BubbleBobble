#include <roingine/engine_event_queue.h>
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

    roingine.Run([&]() {});
}
