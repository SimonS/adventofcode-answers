(require '[clojure.string :as str])

(def normalised-data
  (->> (slurp "2017/inputs/day02.txt")
       str/split-lines
       (map #(map read-string (str/split % #"\t")))))

(defn min-max-func [func]
  "returns a function which executes `func` on the max and min integers in a list"
  (fn [lst] (let [mx (apply max lst)
                  mn (apply min lst)]
              (func mx mn))))

; pt 1:
(reduce + (map (min-max-func -) normalised-data))

(defn divide? [number divisor]
  (zero? (mod number divisor)))

(defn find-divisors [nums]
  (loop [l nums]
    (let [n (first l)
          r (rest l)
          divisors (filter #(or (divide? % n) (divide? n %)) r)]
      (if (not (empty? divisors))
        (conj divisors n)
        (recur r)))))

(reduce + (->> (map find-divisors normalised-data)
               (map (min-max-func /))))
