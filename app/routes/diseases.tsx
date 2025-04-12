import React from 'react'
import type { Route } from '../+types/root';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Disease" },
    { name: "Diseases", content: "View diseases information" },
  ];
}

export default function Diseases(){
  return (
    <div>diseases</div>
  )
}
