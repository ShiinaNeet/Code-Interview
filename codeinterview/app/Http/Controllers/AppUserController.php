<?php

namespace App\Http\Controllers;

use App\Models\AppUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AppUserController extends Controller
{
    public function index()
    {
        return response()->json(AppUser::all(), 200);
    }

    public function store(Request $request)
    {
         $validator = Validator::make($request->all(), [
            'full_name' => 'required|regex:/^[a-zA-Z\s]+$/',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Invalid full name. Only letters are allowed.'], 400);
        }

        $user = AppUser::create([
            'full_name' => $request->full_name,
        ]);

        return response()->json($user, 201);
    }
   
    public function update(Request $request, string $id)
    {
        $user = AppUser::findOrFail($id);
        $user->update(['full_name' => $request->full_name]);
        return response()->json($user, 200);
    }

    public function destroy(string $id)
    {
        $user = AppUser::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted'], 200);
    }
}
