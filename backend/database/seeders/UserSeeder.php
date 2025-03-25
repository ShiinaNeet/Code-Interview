<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'full_name' => 'Gene Paolo Dayandayan',
            'result' => 100,
        ]);

        User::create([
            'full_name' => 'Justin Bieber',
            'result' => 500,
        ]);

        User::create([
            'full_name' => 'John Doe',
            'result' => 200,
        ]);
    }
}
