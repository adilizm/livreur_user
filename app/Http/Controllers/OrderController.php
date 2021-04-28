<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function GetUserOrders($id)
    {
     
        //get all orderes of the user thet has user_id = $id connected user
        $orders = Order::where('user_id',$id)->get();
        return $orders;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function allOrders()
    {
        $orders_with_user=[];
     $orders=Order::orderBy('created_at')->get();
 
        foreach($orders as $order){
             $user =  User::where('id',$order->user_id)->get() ;
            $both=[];
            array_push($both,$order);
            array_push($both,$user);
            array_push($orders_with_user,$both); 
            
        }  
        return $orders_with_user;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
         $request->validate([
            'name' => 'required',
            'description' => 'required',
            'user_id'=>'required',
            'category_id'=>'required'
        ]);
 
        $order = new Order;
        $order->name=$request->name;
        $order->description=$request->description;
        $order->user_id=$request->user_id;
        $order->category_id=$request->category_id;
        $order->statu='new';
        
        $order->save();  
 
       return $request;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function orderlivre($id)
    {
            $order = Order::Find($id);
            $order->statu='livre';
            $order->save();
            return 'order livred';
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
