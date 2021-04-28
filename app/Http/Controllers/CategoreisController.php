<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoreisController extends Controller
{
    public function getAllCategoreis(){

        $categoreis= Category::all();

        return $categoreis;

    }

    public function storeCategory(Request $request){

        /*  $validate = $request->validate([
            'category_name'         =>   'required|min:4', 
            'category_description'  =>   'required|min:10',
            'category_image'        =>   'required|image',
        ]); 

        $category = new Category;
        $category->imageurl = $request->file('category_image');
        $category->category_name = $request->category_name;
        $category->category_description = $request->category_description;
 
      
        
    
        $file = $request->file('category_image');
        $name = '/avatars/' . uniqid() . '.' . $file->extension();
        $file->storePubliclyAs('public/images', $name);

        $category['category_image'] = $name; 

        $category->save();
 
        return [$category,'category saved']; */
      return $request;
    }

    public function store(Request $request)
    { 
          // validate the image and values in request  
         $request->validate([
            'name' => 'required',
            'description' => 'required',
            'image' => 'required|mimes:jpg,jpeg,png,|max:2048'
        ]); 
         // cteate new empty Model 
        $category = new Category();
        // create file path 
        $file_path = time() . '-' . $request->name  . '.' . $request->image->guessExtension();
        //store image in images folder which is in public and assigne other model values
        $request->image->move(public_path('images'), $file_path);
        $category->category_name = $request->name;
        $category->category_description = $request->description;
        //save image path in the model
        $category->image_url = '/images/' . $file_path;
        //save the new model row in database
        $category->save(); 
        // returne category saved if all is done     
        return $request;
    }
}
