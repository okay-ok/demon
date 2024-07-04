import { Suspense, useMemo, useRef, useState,useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Leva, useControls } from 'leva'
import { useGLTF, useScroll, ScrollControls, Environment, Merged, Text, MeshReflectorMaterial } from '@react-three/drei'
import Model from './model'
import Model2 from './model2'
import axios from 'axios'
import React from 'react'
import Navigation from '../components/navbar'
import { getCoordinates } from '../utils/Mapper'
//importing d3 for reading csv file
import * as d3 from 'd3'
//import { readFromCSV } from './utils'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EncodeUTF8 } from 'three/examples/jsm/libs/fflate.module.js'
//importing papa parse to read csv file
import Papa from 'papaparse'
// import Navigation from './navbar'
import Swal from 'sweetalert2';
//import { useState } from 'react';
import { Button } from 'react-bootstrap';
var layoutdata = [];
function Scene() {
  const gltf = useLoader(GLTFLoader, '/rack.glb')
  return <primitive object={gltf.scene} />
}



var vales = [];
var rax=[];
vales["1"] = [];
vales["2"] = [];
vales["3"] = [];
vales["4"] = [];
vales["5"] = [];
vales["6"] = []
//adding button to toggle color from red to blue

//adding a button to toggle the color of the model
function Box(props) {

  const ref = useRef()
  const id=props.Name;
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // console.log(id);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (clicked) {
      // ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;

      // ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;


      // ref.current.rotation.z += 0.01;
    }
    else {
      ref.current.rotation.y = 0;
    }
  });
  // useFrame((state, delta)=>(ref.current.rotation.x += 0.0))
  // Return the view, these are regular Threejs elements expressed in JSX
  //generate color of box according to it's date, later date is greener, earlier date is redder
  const val = props.position[0];
  //scaling the color from red to green
  var bcolor;
  if (val > 0 && val <= 3) { bcolor = "red"; }
  else if (val > 3 && val < 9) { bcolor = "orange"; }
  else { bcolor = "green"; }

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.15 : 1}
  
      onClick={(event) => {
        click(!clicked);
        if (!clicked) {
          //////////////////////////Dialog Box////////////////////////
          Swal.fire({
            title: 'Choose an option:',
            icon: 'question',
            showCancelButton: true,

            confirmButtonText: 'Go To Entry Point',
            cancelButtonText: 'Go Back',
          }).then((result) => {
            if (result.isConfirmed) {
         //redirect to google in new tab and reload that tab as well
              window.open(`/edit-rack/${id}`, "_notbl");
              //redirectTo("localhost:3000");

            } else if (result.dismiss === Swal.DismissReason.cancel) {

            } else {
              // Code for Option 3
            }
          });
          /////////////////////////////////////Dialog Box//////////////////////
        }
        Swal.fire({
          title: 'Choose an option:',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Go To Entry Point',
          cancelButtonText: 'Go Back',

        }).then((result) => {
          if (result.isConfirmed) {
            //redirect to google in new tab
            window.open(`/edit-racks/${id}`, "_notbl");
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // //setting the clicked value to false
            // click(false);
          } else {
            // Code for Option 3
          }
        });

      }

        // if(!clicked){
        // alert("Coordinates"+props.position+"\n"+"Capacity:"+props.position[1]+"\n"+"Location:"+props.position[2]);
        // }
      }

      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}

    >

      <boxGeometry args={[1, 0.7, 1]} />

      <meshStandardMaterial color={clicked ? 'blue' : bcolor} />
    </mesh>
  )


};

function Train() {
  const ref = useRef()
  const scroll = useScroll()
  const [cabin] = useGLTF(['/cabin-transformed.glb'])
 




  console.log("ko");
  const Cabin = ({ models, color = 'red', name, ...props }) => {

    console.log("Currently at rack "+name);
    
    const [loading, setLoading] = useState(false)
    const [racks, setRacks] = useState([]);
    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:3000/pallets')
            .then(res => {
                setRacks(res.data.data)
                
                rax = res.data.data;
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })  
    }
    , []);
    console.log(rax);
    for (var j=0;j<racks.length;j++){
      if (racks[j].Zone==name){
        vales[name] = [...vales[name], racks[j]];
      }
    }
    console.log(vales[name]);
    // Papa.parse('/layout.csv', 
    // {
    //   download: true,
    //   header: true,
    //   dynamicTyping: true,
    //   complete: function (results) {
    //   var data = results.data;
    //   //console.log(data);
    //   for (var i = 0; i < data.length; i++) {
    //     if (data[i]['location'] == name) {
    //     console.log("found!");
    //     vales[name] = [...vales[name], data[i]];

    //     }
    //   }
    //   }
    // }
    // );


    console.log(vales[name]);
    //const [active, setActive] = useState(false)
    return (
      <group {...props} >
        <Text fontSize={4} color="white" position={[0, 0, 19]} rotation={[-Math.PI / 2, 0, 0]} >
          {(name)}
        </Text>
        {/* console.log(data) */}
        <models.Cabin color={color} scale={[6, 1, 2]} />
        

        <Suspense fallback={null}>
          {
            vales[name].map((data) => {
              return (
                <group>
                  <Model2

                    position={getCoordinates(data['Aisle'], data['Rack'], 0)}

                    scale={[1.7, 3.5, 2.5]}
                  />

                  <Box position={getCoordinates(data['Aisle'],data['Rack'],data['Level'])} Name={data['_id']}  />
                  {/* <Box position={[data['x'], data['y'] + 2.5, data['z']]} />
                  <Box position={[data['x'], data['y'] + 4.3, data['z']]} /> */}
                </group>
                
              );


            }
            )}

          <Environment preset="dawn" background />

        </Suspense>

      </group>
    );
  };
  const meshes = useMemo(() => ({ Cabin: cabin.nodes.cabin_1 }), [cabin])
  useFrame(() => (ref.current.position.z = scroll.offset * 340))
  // Merged creates THREE.InstancedMeshes out of the meshes you feed it
  // All in all we end up with just 5 draw-calls for the entire scene
  const { radius, ambient, color } = useControls({
    color:  '#f12' ,
    radius: { value: 3, min: 0, max: 10 },
    ambient: { value: 0.6, min: 0, max: 1 }
  })
  return (
    <>
     
      <Merged castShadow receiveShadow meshes={meshes}>
        {(models) => (
          <group ref={ref}>
            <Cabin models={models} color={color} seatColor="sandybrown" name="1" position={[0, 0, -6]} />
            <Cabin models={models} color="#454545" seatColor="gray" name="2" position={[0, 0, -58]} />
            <Cabin models={models} color="#252525" seatColor="lightskyblue" name="3" position={[0, 0, -110]} />
            <Cabin models={models} color="#454545" seatColor="gray" name="4" position={[0, 0, -162]} />
            <Cabin models={models} color="#252525" seatColor="sandybrown" name="5" position={[0, 0, -214]} />
            <Cabin models={models} color="#454545" name="6" position={[0, 0, -266]} />

          </group>
        )}
      </Merged>
      
    </>
  )
}




export default function Visual() {
  

  
  return (
    //adding button to toggle color
    //adding a navbar from react bootstrap
    <div>
      {/* <Navigation color="red"/> */}
      
      
      
      
      <Navigation/>
        <Canvas  dpr={[1, 1.5]} shadows camera={{ position: [-15, 15, 18], fov: 35 }} gl={{ alpha: false }} style={{height: '641px'}}>
          <fog attach="fog" args={['#17171b', 30, 90]} />
          
<color attach="background"  />
<ambientLight intensity={0.75} />
<directionalLight castShadow intensity={1} position={[1, 6, 6]} shadow-mapSize={[1024, 1024]}>
  <orthographicCamera attach="shadow-camera" left={-20} right={20} top={20} bottom={-20} />
</directionalLight>
<Suspense fallback={null}>
  <ScrollControls pages={8}>
    <Train />
  </ScrollControls>
  <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
    <planeGeometry args={[90, 90]} />
    <MeshReflectorMaterial
      blur={[400, 100]}
      resolution={1024}
      mixBlur={1}
      mixStrength={15}
      depthScale={1}
      minDepthThreshold={0.85}
      color="#151515"
      metalness={0.6}
      roughness={1}
    />
  </mesh>
  <Environment preset='forest' />
</Suspense>

</Canvas> 
        
      
      
        
      
      
    </div>
  )
}
