<?php

namespace App\Manager;

use App\Models\Country;
use Illuminate\Support\Facades\Http;

class ScriptManager
{
    /**
     * @return string
     */
    public function getCountries(): string
    {
        $url = 'https://restcountries.com/v3.1/all';
        $respose = Http::get($url);
        $countries = json_decode($respose->body(), true);
        foreach ($countries as $country) {
            $country_data['name'] = $country['name']['common'];
            Country::create($country_data);
        }
        return $country_data;
    }
}
