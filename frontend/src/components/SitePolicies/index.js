import React, { useState, useEffect } from "react";
import {useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { csrfFetch } from '../../store/csrf.js';
import { policies } from './policies'

function SitePolicies() {

  return (
    <div>
        <h2 className="px-10 my-6 text-2xl">Site Policies and User Agreement:</h2>
        <p className="px-10 my-6">By using this site you agree to the following:</p>
        <p className="px-10">{policies}</p>
    </div>
  );
}


export default SitePolicies;
