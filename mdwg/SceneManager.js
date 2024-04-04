//~---------------------------------------------------------------------------//
//                               *       +                                    //
//                         '                  |                               //
//                     ()    .-.,="``"=.    - o -                             //
//                           '=/_       \     |                               //
//                        *   |  '=._    |                                    //
//                             \     `=./`,        '                          //
//                          .   '=.__.=' `='      *                           //
//                 +                         +                                //
//                      O      *        '       .                             //
//                                                                            //
//  File      : SceneManager.js                                               //
//  Project   : mdwg                                                          //
//  Date      : 2024-03-29                                                    //
//  License   : See project's COPYING.TXT for full info.                      //
//  Author    : mateus.digital <hello@mateus.digital>                         //
//  Copyright : mateus.digital - 2024                                         //
//                                                                            //
//  Description :                                                             //
//                                                                            //
//---------------------------------------------------------------------------~//


//------------------------------------------------------------------------------
class SceneManager
{
    //--------------------------------------------------------------------------
    constructor()
    {
        this.currScene  = null;
        this.sceneStack = [];
    } // ctor

    //--------------------------------------------------------------------------
    PushScene(scene)
    {
        // Pushing the same scene....
        if(this.currScene != null &&
           this.currScene.rtvar_objectId == scene.rtvar_objectId)
        {
            debugger;
            return;
        }

        if(this.currScene) {
            this.currScene.OnExit();
            this.currScene.parent.removeChild(this.currScene);
        }

        this.currScene = scene;
        this.currScene.OnLoad();

        this.sceneStack.push(scene);
        Application.PixiApp().stage.addChild(this.currScene);

        this.currScene.OnEnter();
    } // Push Scene

    //--------------------------------------------------------------------------
    SetScene(scene)
    {
        while(this.sceneStack.length != 0) {
            this.PopScene();
        }
        this.currScene = null;
        this.PushScene(scene);
    } // Set Scene

    //--------------------------------------------------------------------------
    PopScene()
    {
        const scene = Array_GetBack(this.sceneStack);
        scene.OnExit();

        if(scene.parent != null) {
            scene.parent.removeChild(scene);
        }

        scene.OnUnload();
        Array_RemoveLast(this.sceneStack);

        const prev_scene = Array_GetBack(this.sceneStack);
        if(prev_scene) {
            Application.PixiApp().stage.addChild(prev_scene);
            prev_scene.OnEnter();
            this.currScene = prev_scene;
        }
    }

    //--------------------------------------------------------------------------
    Update(dt)
    {
        this.currScene.Update(dt);
    }
};