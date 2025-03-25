<?php

namespace Database\Seeders;

use App\Models\AppUser;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AppUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AppUser::create([
            'full_name' => 'Gene Paolo Dayandayan',
        ]);

        AppUser::create([
            'full_name' => 'Justin Bieber',
        ]);

        AppUser::create([
            'full_name' => 'John Doe',
        ]);
    }
}
