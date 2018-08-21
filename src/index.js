import './index.css';
import {select, range, voronoi, mouse} from 'd3';
import {random} from './lib/utils';

const svg = select("svg").on("touchmove mousemove", moved),
  width = +svg.attr("width"),
  height = +svg.attr("height");

const sites = range(100)
  .map(() => {
    return [random(0, width), random(0, height)];
  });

const voronoiDiagram = voronoi()
  .extent([[-1, -1], [width + 1, height + 1]]);

let polygon = svg.append("g")
  .attr("class", "polygons")
  .selectAll("path")
  .data(voronoiDiagram.polygons(sites))
  .enter().append("path")
  .call(redrawPolygon);

let link = svg.append("g")
  .attr("class", "links")
  .selectAll("line")
  .data(voronoiDiagram.links(sites))
  .enter().append("line")
  .call(redrawLink);

let site = svg.append("g")
  .attr("class", "sites")
  .selectAll("circle")
  .data(sites)
  .enter().append("circle")
  .attr("r", 2.5)
  .call(redrawSite);

function moved() {
  sites[0] = mouse(this);
  redraw();
}

function redraw() {
  const diagram = voronoiDiagram(sites);
  polygon = polygon.data(diagram.polygons()).call(redrawPolygon);
  link = link.data(diagram.links()), link.exit().remove();
  link = link.enter().append("line").merge(link).call(redrawLink);
  site = site.data(sites).call(redrawSite);
}

function redrawPolygon(polygon) {
  polygon
    .attr("d", function(d) { return d ? "M" + d.join("L") + "Z" : null; });
}

function redrawLink(link) {
  link
    .attr("x1", function(d) { return d.source[0]; })
    .attr("y1", function(d) { return d.source[1]; })
    .attr("x2", function(d) { return d.target[0]; })
    .attr("y2", function(d) { return d.target[1]; });
}

function redrawSite(site) {
  site
    .attr("cx", function(d) { return d[0]; })
    .attr("cy", function(d) { return d[1]; });
}